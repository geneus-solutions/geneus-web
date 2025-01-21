import React from "react";
import "./LandingPage.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import Background from "../../components/LandingPage/Background";
import WhyAttend from "../../components/LandingPage/WhyAttend";
import RecomendToAttend from "../../components/LandingPage/RecomendToAttend";
import img1 from "../../assets/landingImage_01.webp";
import img2 from "../../assets/landingImage_02.webp";
import img3 from "../../assets/landingImage_03.webp";
import WhatWeCover from "../../components/LandingPage/WhatWeCover";
import FAQ from "../../components/LandingPage/FAQ";
import Mentor from "../../components/LandingPage/Mentor";
import { useSelector } from "react-redux";
import { useCourceQuery } from "../../features/cources/courceApiSlice";
import { useParams } from "react-router-dom";
import Course from "../Courses";

const LandingPage = () => {
  const RecomentdContent = [
    {
      title: "Beginner",
      heading: "Wanting To Kickstart Your Financial Journey & Build Wealth",
      description:
        "From students to entrepreneurs, discover how AI can empower you to build wealth and secure financial freedom without prior experience.",
      imageUrl: img1,
    },
    {
      title: "Trader",
      heading: "Wanting To Skyrocket Your Success & Multiply Your Profits",
      description:
        "Mid-level traders, investors, and market practitioners, dive into the world of AI to revolutionise your strategies and maximise your profits like never before.",
      imageUrl: img2,
    },
    {
      title: "Beginner",
      heading: "Wanting To Kickstart Your Financial Journey & Build Wealth",
      description:
        "Seasoned professionals and intra-day traders, harness the full potential of AI to scale your strategies 10x and discover further edge to dominate the market.",
      imageUrl: img3,
    },
  ];

  // const WhatWeCoverContent = [
  //   {
  //     heading: "Trading beyond Stock Charts like a PRO",
  //     description:
  //       "Profitable stock trading becomes 10x easier when you understand how to trade like Institutional Traders & I will teach you how to do it.",
  //   },
  //   {
  //     heading: "Automating your Trade Research effortlessly",
  //     description:
  //       "Manual trade research can be boring & time consuming. Learn to automate it without coding & save 2 hours everyday.",
  //   },
  //   {
  //     heading: "AI Driven Stock Back Testing",
  //     description:
  //       "Learn to leverage the power of AI to back test your strategies & get proven returns data before you take your next trade.",
  //   },
  //   {
  //     heading: "Applying my Proprietary 33% CAGR Strategy",
  //     description:
  //       "Get a ready made automated scanning system to generate 33% CAGR based on 7 years of back tested data on NIFTY.",
  //   },
  //   {
  //     heading: "Automating Trade Execution without Coding",
  //     description:
  //       "Take trades even while you are at work without sitting in front of a trading screen every single day.",
  //   },
  //   {
  //     heading: "Mastering P.E.A.K. Framework for Consistent Profits",
  //     description:
  //       "Find out how our proprietary P.E.A.K framework can make you 2-3x more returns than NIFTY even on limited capital. ",
  //   },
  // ];

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: course } = useCourceQuery(
    { id, user_id: user?.id },
    { skip: !id }
  );
  console.log("this is course", course);
  console.log("this is user", user);
  console.log("this is course Id", id);

  return (
    <>
      <div className="main-container">
        <Background course={course} />
        <WhyAttend course={course?.learnings} />
        <div className="recommend-to-attend-heading">
          <h1>5,500+ PAST ATTENDEES...</h1>
          <h3>
            Recommend You To Attend This Workshop, If You Fit Any Of The
            Following ⬇️
          </h3>
        </div>
        {/* <div className="recomend-to-attend-container">
          {RecomentdContent &&
            RecomentdContent.map((value, index) => (
              <RecomendToAttend
                key={index}
                title={value.title}
                heading={value.heading}
                description={value.description}
                imageUrl={value.imageUrl}
              />
            ))}
        </div> */}
        <div className="recomend-to-attend-container">
          {course?.whoitsfor &&
            course?.whoitsfor?.map((value, index) => (
              <div className="ai-button">
                <span className="icon">✔️</span>
                <span className="text">{value}</span>
              </div>
            ))}
        </div>
        <div className="recommend-to-attend-heading">
          <h1>Here's What We'll Cover Inside...</h1>
        </div>
        <div className="recomend-to-attend-container">
          {course?.courseContent &&
            course?.courseContent.map((value, index) => (
              <WhatWeCover
                key={index}
                heading={value.contentTitle}
                description={value.time}
              />
            ))}
        </div>
        <Mentor />
        {/* <FAQ course={course} /> */}
      </div>
    </>
  );
};

export default LandingPage;
