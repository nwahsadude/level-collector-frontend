import React from "react";
import * as _ from "lodash";

const LevelList = ({ levelList, onSkip }) => {

  levelList = _.sortBy(levelList, ["createdAt"]);
  levelList = levelList.filter(b => {
    return b.skipped && !b.cleared;
  });

  return (
    <div>
      <center>
        <h1> Skipped LevelCodes - {levelList.length}</h1>
      </center>

      {levelList.map(level => (
        <center key={level.levelCode}>
          <div className="card">
            <div className="card-body">
              <div className="mb-1">
                <span className="levelCode" >{level.levelCode}</span>
              </div>
              <div className="mb-1">
                <span className="userName" >{level.userName}</span>
              </div>
              <div className="mb-1">
                <span>
                  Added: {new Date(level.createdAt).toLocaleDateString()}{" "}
                  {new Date(level.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <div className="mb-1">
                <button className="btn btn-warning  mr-2 ml-2" onClick={e => onSkip(level, e)}>
                {!level.skipped && (<span>Skip Level</span>)}
                  {level.skipped && (<span>Un-Skip Level</span>)}
                </button>
              </div>

            </div>
          </div>
        </center>
      ))}
    </div>
  );
};

export default LevelList;
