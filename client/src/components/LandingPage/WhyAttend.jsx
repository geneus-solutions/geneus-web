import React from "react";
import "./WhyAttend.css";
import { MdArrowCircleRight } from "react-icons/md";
import UnlockButton from "./components/UnlockButton";

const WhyAttend = ({course}) => {
  const content = [
    "Do AI-Driven Market Research and Analysis In Less Than 5 Minutes",
    "Make More Accurate Trading Decisions and Outperform The Market",
    "Use AI to back-test your strategies",
    "Improve Your Portfolio’s Performance By 2X",
    "Create AI-powered Algorithmic Trading Strategies",
    "Make intraday trading a 5-second task",
  ];
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
