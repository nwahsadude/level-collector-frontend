import React from "react";
import * as _ from "lodash"

const ClearedLevelList = ({ levelList, onClear }) => {

  levelList = _.orderBy(levelList, ["createdAt"], ["desc"]);
  levelList = levelList.filter(b => {
        return b.cleared && !b.skipped;
      })

  return (
    <div>
      <center>
        <h1>Cleared LevelCodes - {levelList.length}</h1>

      </center>

      {levelList.map(level => (
        <center key={level.levelCode}>
          <div className="card">
            <div className="card-body">
              <div className="mb-1">
                <span className="levelCode">{level.levelCode}</span>
              </div>
              <div className="mb-1">
                <span className="userName" >{level.userName}</span>
              </div>
              <div className="mb-1">
                <span>Added: {new Date(level.createdAt).toLocaleDateString()} {new Date(level.createdAt).toLocaleTimeString()}</span>
              </div>
              <div className="mb-1">
                <button className="btn btn-info" onClick={e => onClear(level, e)}>Redo Level</button>
              </div>
            </div>
          </div>
        </center>
      ))}
    </div>
  );
};

export default ClearedLevelList;
