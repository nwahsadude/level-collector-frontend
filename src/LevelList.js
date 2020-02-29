import React from "react";
import * as _ from "lodash";


const LevelList = ({ levelList, onDelete }) => {
  function handleClick(a, event) {
    onDelete(a);
  }

  levelList = _.sortBy(levelList, ["createdAt"]);
  levelList = levelList.filter(b => {
    return !b.completed;
  });

  return (
    <div>
      <center>
        <h1>LevelCodes - {levelList.length}</h1>
      </center>

      {levelList.map(level => (
        <center>
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
                <button className="btn btn-success mr-2 ml-2" onClick={e => handleClick(level, e)}>
                  Clear Level
                </button>
                <button className="btn btn-warning  mr-2 ml-2" onClick={e => handleClick(level, e)}>
                  Skip Level
                </button>
                <button className="btn btn-danger mr-2 ml-2" onClick={(e) => handleClick(level, e)}> <span className="fa fa-search"></span>Delete Level</button>
              </div>

            </div>
          </div>
        </center>
      ))}
    </div>
  );
};

export default LevelList;
