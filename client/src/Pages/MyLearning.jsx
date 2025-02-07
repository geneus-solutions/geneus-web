import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useMyLearningQuery } from "../features/MyLearning/LearningApiSlice";

import MyLearningSidebar from "../components/my_learningComponents/My_LearningSidebar";
import MyLearningCourseDetails from "../components/my_learningComponents/My_Learning_CourseDetails";
// import MyLearningCourseContent from "../components/my_learningComponents/My_Learning_CourseContent";
// import MyLearningAuthorInfo from "../components/my_learningComponents/My_Learning_AuthorInfo";

import "../styles/My_Learning.css";

const MyLearning = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: courses,
    isLoading,
    // refetch,
  } = useMyLearningQuery({ user_Id: user?.id }, { skip: !user?.id });
  // const a = useMyLearningQuery({ user_Id: user?.id },
  // { skip: !user?.id });
  // console.log('this is user', a)

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  return (
    <div className="dashboard">
      {!isLoading && courses?.courses?.length >= 0 ? (
        <>
          <MyLearningSidebar data={courses} />
          <main className="main-content">
            <MyLearningCourseDetails data={courses} />
          </main>
        </>
      ) : (
        <p>No Course Purchase.</p>
      )}
    </div>
  );
};

export default MyLearning;
