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
import RecomendToAttend from "../../components/LandingPage/RecomendToAttend";

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
          <RecomendToAttend course={course}/>
          <WhatWeCover course={course?.courseContent}/>
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
