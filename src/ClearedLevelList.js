import React from "react";
import * as _ from "lodash"

const CompletedLevelList = ({ levelList, onDelete }) => {


  function handleClick(a, event) {
    onDelete(a)
  }
  levelList = _.orderBy(levelList, ["createdAt"], ["desc"]);
  levelList = levelList.filter(b => {
        return b.cleared && !b.skipped;
      })

  return (
    <div>
      <center>
        <h1>Completed LevelCodes - {levelList.length}</h1>

      </center>

      {levelList.map(a => (
        <center>
          <div className="card">
            <div className="card-body">
              <div className="mb-1">
                <span className="levelCode">{a.levelCode}</span>
              </div>
              <div className="mb-1">
                <span className="userName" >{a.userName}</span>
              </div>
              <div className="mb-1">
                <span>Added: {new Date(a.createdAt).toLocaleDateString()} {new Date(a.createdAt).toLocaleTimeString()}</span>
              </div>
              <div className="mb-1">
                <button className="btn btn-info" onClick={(e) => handleClick(a, e)}>Redo Level</button>
              </div>
            </div>
          </div>
        </center>
      ))}
    </div>
  );
};

export default CompletedLevelList;
