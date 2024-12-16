import React from "react";
import { Link } from "react-router-dom";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course?.img} alt={course?.title} className="coursecard-image" />
      <div className="course-body">
        <h3 className="coursecard-title">{course?.title}</h3>   
        <div className="rating">
          <i>⭐</i>
          <i>⭐</i>
          <i>⭐</i>
          <i>⭐</i>
          <i>⭐</i>
        </div>
        <p className="course-price">
          <s>₹{course?.price}</s>{" "}
          <strong className="text-danger">₹{course?.discount_price}</strong>
        </p>
        <div className="text-center">
          <Link to={`/course/${course?._id}`}>
            <button className="view-more-btn">View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
