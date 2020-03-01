import React, { Component } from "react";
import { render } from "react-dom";
import LevelList from "./LevelList";
import ClearedLevelList from "./ClearedLevelList";
import SkippedLevelList from "./SkippedLevelList";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Tabs, Tab} from 'react-bootstrap-tabs';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
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
      `https://vwwfgua8k2.execute-api.us-east-1.amazonaws.com/dev/level/clear/${level.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ cleared: !level.cleared })
      }
    )
      .then(results => results.json())
      .then(json => {


        const index = this.state.levelList.findIndex(level => level.id === json.id);
        const levelList = [...this.state.levelList];
        levelList[index] = json;
        this.setState({levelList});

        console.log(json);
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  }

  handleSkip(level) {
    console.log(level);

    fetch(
      `https://vwwfgua8k2.execute-api.us-east-1.amazonaws.com/dev/level/skip/${level.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ skipped: !level.skipped })
      }
    )
      .then(results => results.json())
      .then(json => {


        const index = this.state.levelList.findIndex(level => level.id === json.id);
        const levelList = [...this.state.levelList];
        levelList[index] = json;
        this.setState({levelList});

        console.log(json);
      })
      .catch(err => {
        console.log("err");
        console.log(err);
      });
  }

  deleteLevel(levelCode) {
    console.log(levelCode);

    // fetch(`https://92f3omyr9j.execute-api.us-west-2.amazonaws.com/dev/removeLevel?levelcode=${levelCode}`)
    // .then(results =>results.json())
    //     .then(json => {
    //
    //
    //     }).catch(err => {
    //       this.fetchLevels();
    //       console.log("err")
    //       console.log(err)
    //     });
  }

  fetchLevels() {
    console.log("fetched levels");
    fetch("https://vwwfgua8k2.execute-api.us-east-1.amazonaws.com/dev/level")
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

  render() {

    return (
      <div className="m-2">
        <center>
          <button
            className="btn btn-primary"
            onClick={() => this.fetchLevels()}
          >
            Refresh
          </button>
        </center>

        <div className='ml-2'>
            <div className="row">
              <Tabs className="w-100" contentClass="tab-content-default">
                <Tab label="LevelList">
                  <div>
                    <div>
                      <LevelList
                        levelList={this.state.levelList}
                        onDelete={e => this.handleDelete(e)}
                        onClear={e => this.handleClear(e)}
                        onSkip={e => this.handleSkip(e)}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab label="ClearedLevels">
                  <div>
                    <div>
                      <ClearedLevelList
                        levelList={this.state.levelList}
                        onDelete={e => this.handleDelete(e)}
                        onClear={e => this.handleClear(e)}
                        onSkip={e => this.handleSkip(e)}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab label="SkippedLevels" >
                  <div>
                    <div>
                      <SkippedLevelList
                        levelList={this.state.levelList}
                        onDelete={e => this.handleDelete(e)}
                        onClear={e => this.handleClear(e)}
                        onSkip={e => this.handleSkip(e)}
                      />
                    </div>
                  </div>
                </Tab>
                </Tabs>
            </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
