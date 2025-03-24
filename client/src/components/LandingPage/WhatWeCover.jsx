import React from "react";
import "./WhatWeCover.css";

const WhatWeCover = ({ heading, description, course }) => {
  return (
    <>
      <div className="recommend-to-attend-heading">
        <h1>Here's What We'll Cover Inside...</h1>
      </div>
      <div className="recomend-to-attend-container">
        {course && course?.map((value, index) => (
        <div className="what-we-cover" key={index}>
          <div className="heading-what-we-cover">
            <p className="trading-beyond-stock">{value.contentTitle}</p>
          </div>

          <p className="profitable-stock">{value.time}</p>
        </div>

        ))}
      </div>
    </>
  );
};

export default WhatWeCover;
