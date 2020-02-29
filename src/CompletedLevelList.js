import React from "react";
import * as _ from "lodash"

const CompletedLevelList = ({ levelList, onDelete }) => {


  function handleClick(a, event) {
    onDelete(a)
  }
  levelList = _.orderBy(levelList, ["submitTime"], ["desc"]);
  levelList = levelList.filter(b => {
        return b.completed
      })

  return (
    <div>
      <center>
        <h1>Completed LevelCodes</h1>
      </center>

      {levelList.map(a => (
        <center>
          <div class="card">
            <div class="card-body">
              <div class="mb-1">
                <span>level code: {a.levelCode}</span>
              </div>
              <div class="mb-1">
                <span>username: {a.userName}</span>
              </div>
              <div class="mb-1">
                <span>Added: {new Date(a.requestTime).toLocaleDateString()} {new Date(a.requestTime).toLocaleTimeString()}</span>
              </div>
              <div class="mb-1">
                <button class="btn btn-danger" onClick={(e) => handleClick(a, e)}>Completed</button>
                {a.completed && <span class="badge badge-secondary">Completed</span>}
              </div>
            </div>
          </div>
        </center>
      ))}
    </div>
  );
};

export default CompletedLevelList;
