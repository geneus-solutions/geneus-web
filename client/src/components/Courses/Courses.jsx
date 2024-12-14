import React, { useState } from "react";
import img1 from "../../assets/banner.jpeg";
import "./Course.css";
import { useCourcesQuery } from "../../features/cources/courceApiSlice";
import CourseCard from "./CourseCard";
import CourseBanner from "./CourseBanner";

const Course = ({ searchResults }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const { data: courses } = useCourcesQuery();

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  const filteredCourses = courses?.filter((course) => {
    if (selectedOption === "beginner") {
      return course.level === "beginner";
    } else if (selectedOption === "intermediate") {
      return course.level === "intermediate";
    } else if (selectedOption === "advanced") {
      return course.level === "advanced";
    }
    return true;
  });

  const beginnerCourses = filteredCourses?.filter(
    (course) => course.level === "beginner" && course.enabled === true
  );
  const intermediateCourses = filteredCourses?.filter(
    (course) => course.level === "intermediate" && course.enabled === true
  );
  const advancedCourses = filteredCourses?.filter(
    (course) => course.level === "advanced" && course.enabled === true
  );

  const displayedCourses =
    searchResults?.length > 0
      ? searchResults
      : selectedOption === "beginner"
      ? beginnerCourses
      : selectedOption === "intermediate"
      ? intermediateCourses
      : selectedOption === "advanced"
      ? advancedCourses
      : courses?.filter((course) => course?.enabled === true);

      const course = {
        title: "Course",
        description: "There are many course Listed here select the course as your choice"
      }

  return (

    <div>
      <CourseBanner
      imgSrc={img1}
      course={course}
      />
      <div className="dropdown">
        <button className="dropbtn">
          {selectedOption || "Categories"}
          <span className="arrow-down"></span>
        </button>
        <div className="dropdown-content">
          <span onClick={() => handleDropdownChange("beginner")}>Beginner</span>
          <span onClick={() => handleDropdownChange("intermediate")}>
            Intermediate
          </span>
          <span onClick={() => handleDropdownChange("advanced")}>Advanced</span>
        </div>
      </div>

      <div className="courses-container">
        {displayedCourses?.map((course) => (
          <CourseCard key={course?.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Course;
