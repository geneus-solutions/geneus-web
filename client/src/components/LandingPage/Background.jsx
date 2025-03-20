import React from "react";
import "./Background.css";
import UnlockButton from "./components/UnlockButton";

const Background = ({ course }) => {
  // console.log(course?.courseContent[0]?.url)

  return (
    <div className="background">
      <div className="heading">
        <p className="THE-SECRET-TO">{course?.title}</p>
        <p className="heading-no-need-to">{course?.description}</p>
      </div>
      <div className="background-container">
        <div className="iframe">
          <iframe
            src="https://www.youtube.com/embed/2eTIgVyBnNg?rel=0&controls=0&showinfo=0&modestbranding=1"
            width="100%"
            height="300px"
            allow="autoplay"
            allowFullScreen
            title="Google Drive Video"
            style={{ maxWidth: "600px", border: "none" }}
          ></iframe>
        </div>
        {/* In the commented section the live data here :-*/}
        {/* <div className="div">
        <span className="container">
        <SlCalender />
        </span>
        <div className="heading-on-jan">On 25 Jan, Saturday</div>
        </div>
        
        <div className="div-2">
        <span className="container">
        <GiSandsOfTime />
        </span>
        <div className="heading-hours">3 Hours+</div>
        </div>
        
        <div className="div-3">
        <span className="container">
        <RiLiveFill />
        </span>
        <div className="heading-live">Live Session</div>
        </div>
        
        <div className="div-4">
        <span className="container">
        <MdOutlineWatchLater />
        </span>
        <div className="heading-PM">7 PM Onwards</div>
        </div> */}

        <div className="ready-to-grow-your-wrapper">
          <div>
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
          <div className="heading-no-prior">
            <UnlockButton course={course} />
            <p>*No Prior Experience Needed*</p>
          </div>
        </div>
      </div>
      {/* <div className="container-2">
        <div className="paragraph-border">
          <div className="text-wrapper-4">04</div>

          <div className="text-wrapper-5">Minutes</div>
        </div>

        <div className="paragraph-border-2">
          <div className="text-wrapper-6">50</div>

          <div className="text-wrapper-7">Seconds</div>
          </div>
          </div> */}
    </div>
  );
};

export default Background;
