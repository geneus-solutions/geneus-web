import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";

import MyLearningCourseContent from "./My_Learning_CourseContent";

import "../../styles/My_Learning.css";


const MyLearningCourseDetails = ({data}) => {

  const [courseData, setCourseData] = useState({});
  
  const location = useLocation();
  const courseId = location.state?.courseId;
  const currentContent = location.state?.content;
  
  useEffect(() => {
    if(data?.courses){
      const course = data?.courses?.find(course => course?._id === courseId);
      setCourseData(course);
    }
  }, [courseId,data]);
  
  console.log('this is url', currentContent?.url)
  console.log('this is course data form courseDeatials', data)
  return (
    <div className="course-details">
        <div style={{padding:'10px 0'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <h5 style={{margin:0}}>{courseData?.whythisCourse?.title}</h5>
                <p style={{margin:0 ,fontSize:'13px'}}>🧑‍🏫{currentContent?.contentTitle}</p>
            </div>
            {/* <p style={{margin:0,fontSize:'12px'}}>⭐ 4.5 (226 reviews)</p> */}
        </div>
        <div className="course-content-panel">
          <div>
              <div className="video-container">
                <iframe
                    src={`${currentContent?.url}?rel=0&modestbranding=1&showinfo=0`}
                    width="100%" // Full width of the container
                    height="400px" // Adjusted height
                    style={{ border: "none", borderRadius: "8px" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
              </div>
              {/* <div className="tabs">
                <button className="active">Overview</button>
                <button>Author</button>
                <button>FAQ</button>
                <button>Announcements</button>
                <button>Reviews</button>
              </div> */}
              <div className="about-course">
                <h2>About Course</h2>
                <p>
                   {courseData?.aboutCourse?.intro}
                </p>
              </div>
          </div>
          <div className="side-panel">
            <MyLearningCourseContent data={courseData} />
            {/* <MyLearningAuthorInfo /> */}
          </div>
        </div>
    </div>
  );
};

export default MyLearningCourseDetails;
