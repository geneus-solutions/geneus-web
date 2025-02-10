import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

  console.log("this is course data form courseDeatials", courseData);
  return (
    // <div className="course-details">
    //   <div style={{ padding: "10px 0" }}>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignContent: "left",
    //         gap: "10px",
    //       }}
    //     >
    //       <h5 style={{ margin: 0, fontSize: "30px" }}>{courseData?.title}</h5>
    //       <p style={{ margin: 0, fontSize: "18px" }}>
    //         <b>
    //           {/* {Object.keys(currentContent)[0]}
    //           {":-  "} */}
    //         </b>
    //         {currentContent?.contentTitle}
    //       </p>
    //     </div>
    //     {/* <p style={{margin:0,fontSize:'12px'}}>⭐ 4.5 (226 reviews)</p> */}
    //   </div>
    //   <div className="course-content-panel">
    //     <div>
    //       <div className="video-container">
    //         <iframe
    //           src={`${currentContent?.url}?rel=0&modestbranding=1&showinfo=0`}
    //           width="100%" // Full width of the container
    //           height="400px" // Adjusted height
    //           style={{ border: "none", borderRadius: "8px" }}
    //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //           allowFullScreen
    //         ></iframe>
    //       </div>
    //       <div className="tabs">
    //         {["Overview", /*"Author",*/ "Requirements", "Learnings", "Reviews"].map(
    //           (tab) => (
    //             <button
    //               key={tab}
    //               className={selectedTab === tab ? "active" : ""}
    //               onClick={() => setSelectedTab(tab)}
    //             >
    //               {tab}
    //             </button>
    //           )
    //         )}
    //       </div>

    //       {/* Tab Content - Only show the selected tab's content */}
    //       <div className="tab-content">
    //         {selectedTab === "Overview" && (
    //           <div className="about-course">
    //             <h2>About Course</h2>
    //             <p>{courseData?.aboutCourse?.intro}</p>
    //           </div>
    //         )}

    //         {/* {selectedTab === "Author" && (
    //           <div className="author-info">
    //             <h2>Author</h2>
    //             <img src={courseData?.mentorImage} alt="author"></img>
    //           </div>
    //         )} */}

    //         {selectedTab === "Requirements" && (
    //           <div className="faq-section">
    //             <h2>Requirements</h2>
    //             {
    //               courseData?.requirements?.map((val, index)=>(
    //                 <p key={index}>{val}</p>
    //               ))
    //             }
    //           </div>
    //         )}

    //         {selectedTab === "Learnings" && (
    //           <div className="announcements-section">
    //             <h2>Learnings</h2>
    //             {
    //               courseData?.learnings?.map((val, index)=>(
    //                 <p key={index}>{val}</p>
    //               ))
    //             }
    //           </div>
    //         )}

    //         {selectedTab === "Reviews" && (
    //           <div className="reviews-section">
    //             <h2>Reviews</h2>
    //             <p>{courseData?.reviews}</p>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div className="side-panel">
    //       <MyLearningCourseContent data={courseData} />
    //       {/* <MyLearningAuthorInfo /> */}
    //     </div>
    //   </div>
    // </div>
    <div className="course-details">
      <div className="course-content">
        <h5 className="course-title">{courseData?.title}</h5>
        <p className="content-title">
          <b>{currentContent?.contentTitle}</b>
        </p>
        <div className="video-container">
          <iframe
            src={`${currentContent?.url}?rel=0&modestbranding=1&showinfo=0`}
            width="100%"
            height="400px"
            className="video-frame"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="tabs">
          {["Overview", "Requirements", "Learnings", /*"Reviews"*/].map((tab) => (
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
