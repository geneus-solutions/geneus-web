import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import MyLearningCourseContent from "./My_Learning_CourseContent";

import "../../styles/MyLearningCourseDetails.css";

const MyLearningCourseDetails = ({ data }) => {
  const [courseData, setCourseData] = useState({});
  const [selectedTab, setSelectedTab] = useState("Overview");

  const location = useLocation();
  const courseId = location.state?.courseId;
  const currentContent = location.state?.content;

  useEffect(() => {
    if (data?.courses) {
      const course = data?.courses?.find((course) => course?._id === courseId);
      setCourseData(course);
    }
  }, [courseId, data]);

  console.log("this is course data", currentContent);
  return (
    <div className="course-details">
      <div className="course-content">
        <h5 className="course-title">{courseData?.title}</h5>
        <p className="content-title">
          <b>{currentContent?.contentTitle}</b>
        </p>
        <div className="video-container">
          <iframe
            src={`${currentContent?.url}?rel=0`}
            width="100%"
            height="400px"
            className="video-frame"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="tabs">
          {[
            "Notes",
            "Overview",
            "Requirements",
            "Learnings" /*"Reviews"*/,
          ].map((tab) => (
            <button
              key={tab}
              className={selectedTab === tab ? "active" : ""}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {selectedTab === "Notes" && (
            <div className="about-course">
              {currentContent?.notes && (
                <>
                  <h2>Drive Links</h2>
                  {currentContent?.driveLinks?.map((val, index) => (
                  <p>
                    <p>Time Project: Drive Link</p>
                    <Link to={val} target="_blank" rel="noopener noreferrer">
                      {" "}
                      Click here
                    </Link>
                  </p>
                  ))}
                </>
              )}
            </div>
          )}
          {selectedTab === "Overview" && (
            <div className="about-course">
              <h2>About Course</h2>
              <p>{courseData?.aboutCourse?.intro}</p>
            </div>
          )}
          {selectedTab === "Requirements" && (
            <div className="faq-section">
              <h2>Requirements</h2>
              {courseData?.requirements?.map((val, index) => (
                <p key={index}>{val}</p>
              ))}
            </div>
          )}
          {selectedTab === "Learnings" && (
            <div className="announcements-section">
              <h2>Learnings</h2>
              {courseData?.learnings?.map((val, index) => (
                <p key={index}>{val}</p>
              ))}
            </div>
          )}
          {/* {selectedTab === "Reviews" && (
            <div className="reviews-section">
              <h2>Reviews</h2>
              <p>{courseData?.reviews}</p>
            </div>
          )} */}
        </div>
      </div>
      {/* <div className="side-panel">
        <MyLearningCourseContent data={courseData} />
      </div> */}
    </div>
  );
};

export default MyLearningCourseDetails;
