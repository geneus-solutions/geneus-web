import React, { useState } from "react";
import img1 from "../../assets/banner.jpeg";
import "./Course.css";
import { Link } from "react-router-dom";
import { useCourcesQuery } from "../../features/cources/courceApiSlice";

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

  return (
    <div>
      <div className="banner-container">
        <img src={img1} className="banner-image" alt="Contact Banner" />
        <div className="banner-overlay">
          <h1 className="banner-text">Courses</h1>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          {selectedOption || "Categories"}
          <span className="arrow-down"></span>
        </button>
        <div className="dropdown-content">
          <span onClick={() => handleDropdownChange("beginner")}>Beginner</span>
          <span onClick={() => handleDropdownChange("intermediate")}>Intermediate</span>
          <span onClick={() => handleDropdownChange("advanced")}>Advanced</span>
        </div>
      </div>

      <div className="courses-container">
        {(searchResults?.length > 0
          ? searchResults
          : selectedOption === "beginner"
          ? beginnerCourses
          : selectedOption === "intermediate"
          ? intermediateCourses
          : selectedOption === "advanced"
          ? advancedCourses
          : courses?.filter((course) => course?.enabled === true)
        )?.map((course) => (
          <div className="course-card" key={course?.id}>
            <img src={course?.img} alt={course?.title} className="course-image" />
            <div className="course-body">
              <h3 className="course-title">{course?.title}</h3>
              <div className="rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <p className="course-price">
                <s>₹{course?.price}</s> <strong className="text-danger">₹{course?.discount_price}</strong>
              </p>
              <div className="text-center">
                <Link to={`/course/${course?._id}`}>
                  <button className="buy-now-btn">Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
