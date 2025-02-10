import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useMyLearningQuery } from "../features/MyLearning/LearningApiSlice";

import MyLearningSidebar from "../components/my_learningComponents/My_LearningSidebar";
import MyLearningCourseDetails from "../components/my_learningComponents/My_Learning_CourseDetails";
// import MyLearningCourseContent from "../components/my_learningComponents/My_Learning_CourseContent";
// import MyLearningAuthorInfo from "../components/my_learningComponents/My_Learning_AuthorInfo";

import "../styles/My_Learning.css";
import MyLearningCourseContent from "../components/my_learningComponents/My_Learning_CourseContent";
import { useLocation } from "react-router-dom";

const MyLearning = () => {
  const { user } = useSelector((state) => state.auth);

  const { data: courses, isLoading } = useMyLearningQuery(
    { user_Id: user?.id },
    { skip: !user?.id }
  );

  const [courseData, setCourseData] = useState({});
  const [selectedTab, setSelectedTab] = useState("Overview");

  const location = useLocation();
  const courseId = location.state?.courseId;
  const currentContent = location.state?.content;

  useEffect(() => {
    if (courses?.courses) {
      const course = courses?.courses?.find((course) => course?._id === courseId);
      setCourseData(course);
    }
  }, [courseId, courses]);

  return (
    <div className="dashboard">
      {!isLoading && courses?.courses?.length >= 0 ? (
        <>
          <aside className="sidebar">
            <MyLearningSidebar data={courses} />
          </aside>
          <main className="main-content">
            <MyLearningCourseDetails data={courses} />
          </main>
          <aside className='right-sidebar'>
            <MyLearningCourseContent data={courseData}/>
          </aside>
        </>
      ) : (
        <p className="no-courses">No Course Purchase.</p>
      )}
    </div>
  );
};

export default MyLearning;
