import React, { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "../../styles/My_Learning.css";

const MyLearningSidebar = ({data}) => {

  const navigate = useNavigate();

  const location = useLocation();
  const courseId = location.state?.courseId;

  useEffect(() => {
    if(!courseId){
      navigate('/my-learning/', { state: { courseId: data?.courses[0]?._id } });
    }
  }, [courseId,data?.courses]);

  const handleActiveCourse = (courseId) => {
    navigate('/my-learning/', { state: { courseId } });
  }

  return (
    <aside className="sidebar">
      <h2 className="logo">My Courses</h2>
      <ul className="menu">
        {data?.courses?.map(course => {
          return (
            <li className={course?._id === courseId && "active"} key={course?._id} onClick={()=>handleActiveCourse(course?._id)} >{course?.whythisCourse?.title}</li>
          )
        })}
      </ul>
      {/* <div className="settings">
        <p>Settings</p>
        <p>Support</p>
      </div> */}
    </aside>
  );
};

export default MyLearningSidebar;
