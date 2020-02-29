import React, { Component } from 'react';
import { render } from 'react-dom';
import LevelList from "./LevelList"
import CompletedLevelList from "./CompletedLevelList"
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as _ from "lodash"

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
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

  deleteLevel(levelCode) {
    console.log(levelCode)

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
    console.log("fetched levels")
     fetch('https://vwwfgua8k2.execute-api.us-east-1.amazonaws.com/dev/level')
      .then(results =>results.json())
        .then(json => {



          this.setState({
            levelList: json, 
          })
        }).catch(err => {
          console.log(err)
        });
  }

  render() {
    return (
      <div className="m-2">
      <center><button className="btn btn-primary" onClick={() => this.fetchLevels()}>Refresh</button></center>
    <div className="row">
    <div className="col-6"><LevelList levelList={this.state.levelList} onDelete={(e) => this.handleDelete(e)}/></div>
    <div className="col-6"><CompletedLevelList levelList={this.state.levelList} onDelete={(e) => this.handleDelete(e)}/></div>
    </div>
          
       
      </div>
    );
  }



}

render(<App />, document.getElementById('root'));
