import React, { Component } from "react";
import { render } from "react-dom";
import LevelList from "./LevelList";
import ClearedLevelList from "./ClearedLevelList";
import SkippedLevelList from "./SkippedLevelList";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap-tabs";
import config from "./config";

class App extends Component {
  constructor() {
    super();
    this.state = {
      levelList: []
    };
  }

  componentDidMount() {
    this.fetchLevels();
  }

  handleDelete(e) {
    // let a = this.state.levelList.filter(level => {
    //   return level.levelCode !== e.levelCode
    // })

    // this.setState({
    //   levelList: a
    // })
    this.deleteLevel(e.levelCode);
  }

  handleClear(level) {
    console.log(level);

    fetch(
      `https://${config.url}.execute-api.us-east-1.amazonaws.com/${config.environment}/level/clear/${level.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ cleared: !level.cleared })
      }
    )
      .then(results => results.json())
      .then(json => {
        const index = this.state.levelList.findIndex(
          level => level.id === json.id
        );
        const levelList = [...this.state.levelList];
        levelList[index] = json;
        this.setState({ levelList });

        console.log(json);
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  }

  handleSkip(level) {
    fetch(
      `https://${config.url}.execute-api.us-east-1.amazonaws.com/${config.environment}/level/skip/${level.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ skipped: !level.skipped })
      }
    )
      .then(results => results.json())
      .then(json => {
        const index = this.state.levelList.findIndex(
          level => level.id === json.id
        );
        const levelList = [...this.state.levelList];
        levelList[index] = json;
        this.setState({ levelList });
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  }

  fetchLevels() {
    console.log("fetched levels");
    fetch(
      `https://${config.url}.execute-api.us-east-1.amazonaws.com/${config.environment}/level/list`
    )
      .then(results => results.json())
      .then(json => {
        this.setState({
          levelList: json
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  completeLevels() {
    fetch(
      `https://${config.url}.execute-api.us-east-1.amazonaws.com/${config.environment}/level/complete`,
      { method: "PUT", body: null }
    )
      .then(() => {
        this.fetchLevels();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="m-2">
        <div className="d-flex justify-content-between">
          <div></div>
          <button
            className="btn btn-primary"
            onClick={() => this.fetchLevels()}
          >
            Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.completeLevels()}
          >
            Complete
          </button>
        </div>
        <div className="ml-2">
          <Tabs className="w-100" contentClass="tab-content-default">
            <Tab label="LevelList">
              <div>
                <LevelList
                  levelList={this.state.levelList}
                  onDelete={e => this.handleDelete(e)}
                  onClear={e => this.handleClear(e)}
                  onSkip={e => this.handleSkip(e)}
                />
              </div>
            </Tab>
            <Tab label="ClearedLevels">
              <div>
                <ClearedLevelList
                  levelList={this.state.levelList}
                  onClear={e => this.handleClear(e)}
                />
              </div>
            </Tab>
            <Tab label="SkippedLevels">
              <div>
                <SkippedLevelList
                  levelList={this.state.levelList}
                  onSkip={e => this.handleSkip(e)}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
