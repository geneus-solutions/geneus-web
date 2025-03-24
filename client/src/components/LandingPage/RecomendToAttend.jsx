import React from "react";
import "./RecomendToAttend.css";

const RecomendToAttend = ({course}) => {
  return (
    <>
      <div className="recommend-to-attend-heading">
        <h1>5,500+ PAST ATTENDEES...</h1>
        <h3>
          Recommend You To Attend This Course, If You Fit Any Of The Following
          ⬇️
        </h3>
      </div>
      <div className="recomend-to-attend-container">
        {course?.whoitsfor &&
          course?.whoitsfor?.map((value, index) => (
            <div className="ai-button" key={index}>
              <span className="icon">✔️</span>
              <span className="text">{value}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default RecomendToAttend;
