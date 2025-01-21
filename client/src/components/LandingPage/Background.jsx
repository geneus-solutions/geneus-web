import React from "react";
import img from "../../assets/blog_1.png";
import { SlCalender } from "react-icons/sl";
import { GiSandsOfTime } from "react-icons/gi";
import { RiLiveFill } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";

import "./Background.css";
import UnlockButton from "./components/UnlockButton";

const Background = ({ course }) => {
  console.log(course?.courseContent[0]?.url)
  // function extractFileId(driveUrl) {
  //   const regex = /\/d\/(.*?)\//;
  //   const match = driveUrl.match(regex);
  //   return match ? match[1] : null;
  // }
  
  // const url = course?.courseContent[0]?.url;
  // const fileId = extractFileId(url);
  // console.log(fileId); // Output: 1059k3NA-uXEYFgvqKhd72sX22bOuG86v
  // const videoUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  return (
    <div className="background">
      <div className="heading">
        <p className="THE-SECRET-TO">
          {/* <span className="text-wrapper">THE SECRET TO </span> */}
          <span className="span">
            {course?.title}
            <br />
            {/* YOUR CAPITAL USING{" "} */}
          </span>

          {/* <span className="text-wrapper">AI-POWERED TRADING</span> */}
        </p>
      </div>
      <p className="heading-no-need-to">{course?.description}</p>

      <div className="iframe">
      <iframe
        src={course?.courseContent[0]?.url}
        width="100%"
        height="300px"
        allow="autoplay"
        allowFullScreen
        title="Google Drive Video"
        style={{ maxWidth: "600px", border: "none" }}
      ></iframe>
      </div>

      <div className="div">
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
      </div>

      {course?.requirements &&
        course?.requirements?.map((value, index) => (
          <div className="list" key={index}>
            <div className="item">
              <span>👉</span>
              <p className="never-miss-trading">{value}</p>
            </div>
          </div>
        ))}

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
      <UnlockButton course={course} />
      <div className="heading-no-prior">*No Prior Experience Needed*</div>
    </div>
  );
};

export default Background;
