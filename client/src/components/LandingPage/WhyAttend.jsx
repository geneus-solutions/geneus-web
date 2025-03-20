import React from "react";
import "./WhyAttend.css";
import { MdArrowCircleRight } from "react-icons/md";

const WhyAttend = ({course}) => {

  return (
    <>
      <div className="whyattend-container">
        <div className="heading">
          <h1>WHY ATTEND THIS COURSE?</h1>
        </div>
        <div className="whyattend-item">
          {course &&
            course?.map((item, index) => (
              <div className="whyattend" key={index}>
                {" "}
                <span className="whyattend-img">
                  {" "}
                  <MdArrowCircleRight />{" "}
                </span>{" "}
                <p className="do-AI-driven-market">{item}</p>{" "}
              </div>
            ))}{" "}
        </div>
        {/* /* The Unlock Button not Showing here this is the error here */ }
      </div>
    </>
  );
};

export default WhyAttend;
