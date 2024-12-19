import React, { useState } from "react";
import img1 from "../../assets/banner.jpeg";
import "./Course.css";
import { useCourcesQuery } from "../../features/cources/courceApiSlice";
import CourseCard from "./CourseCard";
import CourseBanner from "./CourseBanner";
import { IoMdArrowDropdown } from "react-icons/io";

const Course = ({ searchResults }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const { data: courses } = useCourcesQuery();

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  const filteredCourses = courses?.filter((course) => {
    if (selectedOption.toUpperCase() === "BEGINNER") {
      return course.level.toUpperCase() === "BEGINNER";
    } else if (selectedOption.toUpperCase() === "INTERMEDIATE") {
      return course.level.toUpperCase() === "INTERMEDIATE";
    } else if (selectedOption.toUpperCase() === "ADVANCED") {
      return course.level.toUpperCase() === "ADVANCED";
    }
    return true;
  });

  const beginnerCourses = filteredCourses?.filter(
    (course) =>
      course.level.toUpperCase() === "BEGINNER" && course.enabled === true
  );
  const intermediateCourses = filteredCourses?.filter(
    (course) =>
      course.level.toUpperCase() === "INTERMEDIATE" && course.enabled === true
  );
  const advancedCourses = filteredCourses?.filter(
    (course) =>
      course.level.toUpperCase() === "ADVANCED" && course.enabled === true
  );

  const displayedCourses =
    searchResults?.length > 0
      ? searchResults
      : selectedOption === "BEGINNER"
      ? beginnerCourses
      : selectedOption === "INTERMEDIATE"
      ? intermediateCourses
      : selectedOption === "ADVANCED"
      ? advancedCourses
      : courses?.filter((course) => course?.enabled === true);

  const course = {
    title: "Course",
    description:
      "There are many course Listed here select the course as your choice",
  };

  return (
    <div>
      <CourseBanner imgSrc={img1} course={course} />

      {/* course drop down */}
      <div className="dropdown">
          <button className="dropbtn">
            {selectedOption || "All Courses"}
            <IoMdArrowDropdown className="arrow-down" />
          </button>
        <div className="dropdown-content">
          <span onClick={() => handleDropdownChange("BEGINNER")}>BEGINNER</span>
          <span onClick={() => handleDropdownChange("INTERMEDIATE")}>
            INTERMEDIATE
          </span>
          <span onClick={() => handleDropdownChange("ADVANCED")}>ADVANCED</span>
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
