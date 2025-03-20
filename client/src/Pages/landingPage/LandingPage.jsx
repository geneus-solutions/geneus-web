import React from "react";
import "./LandingPage.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import Background from "../../components/LandingPage/Background";
import WhyAttend from "../../components/LandingPage/WhyAttend";
import WhatWeCover from "../../components/LandingPage/WhatWeCover";
import FAQ from "../../components/LandingPage/FAQ";
import Mentor from "../../components/LandingPage/Mentor";
import { useSelector } from "react-redux";
import { useCourceQuery } from "../../features/cources/courceApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const LandingPage = () => {
  // This is constent data for template:-

  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: course, error } = useCourceQuery(
    { id, user_id: user?.id },
    { skip: !id }
  );
  if (!id) {
    return navigate(-1);
  }

  return (
    <>
      {course?._id ? (
        <div className="main-container">
          <Background course={course} />
          <WhyAttend course={course?.learnings} />
          <div className="recommend-to-attend-heading">
            <h1>5,500+ PAST ATTENDEES...</h1>
            <h3>
              Recommend You To Attend This Course, If You Fit Any Of The
              Following ⬇️
            </h3>
          </div>
          {/* This is the compenent if require to uncomment this */}
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
                <div className="ai-button" key={index}>
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
          <FAQ course={course} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LandingPage;
