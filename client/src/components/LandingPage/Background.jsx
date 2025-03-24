import React from "react";
import "./Background.css";
import UnlockButton from "./components/UnlockButton";

const Background = ({ course }) => {
  // console.log(course?.courseContent[0]?.url)

  return (
    <div className="background">
      <div>
        <div className="heading">
          <p className="THE-SECRET-TO">{course?.title}</p>
          <p className="heading-no-need-to">{course?.description}</p>
        </div>
        <div className="background-container">
          <div className="iframe">
            <iframe
              src="https://www.youtube.com/embed/2eTIgVyBnNg?rel=0&controls=0&showinfo=0&modestbranding=1"
              // width="100%"
              height="300px"
              allow="autoplay"
              allowFullScreen
              title="Google Drive Video"
              // style={{ maxWidth: "600px", border: "none" }}
            ></iframe>
          </div>
          <div className="ready-to-grow-your-wrapper">
            <p className="ready-to-grow-your">
              <span className="text-wrapper">Ready To </span>
              <span className="text-wrapper-2">Grow Your Wealth </span>
              <span className="text-wrapper">On </span>
              <span className="text-wrapper-3">
                100%
                <br />
                Web Development?
              </span>
            </p>
            {course?.requirements &&
              course?.requirements?.map((value, index) => (
                <div className="list" key={index}>
                  <div className="item">
                    <ul>
                      <li className="never-miss-trading">{value}</li>
                    </ul>
                    {/* <p className="never-miss-trading"><span>👉</span>{value}</p> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="heading-no-prior">
        <UnlockButton course={course} />
        <p>*No Prior Experience Needed*</p>
      </div>
    </div>
  );
};

export default Background;
