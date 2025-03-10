import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./CourseCard.css";
import { Update } from "@mui/icons-material";
import UpdateAndDeleteButtion from "../admin/UpdateAndDeleteButtion";
import { userDetailsSlice } from "../../redux/slices/userDetails";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";

const CourseCard = ({ course }) => {
  // let myCourse = course?.title === 'Angular'&& course;
  // console.log(`this is my course ${course?.title}`, myCourse);
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

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
            <button className="view-more-btn">Buy Now</button>
          </Link>
        </div>
        {location.pathname === "/all-courses" &&
        (
              <div>
                <UpdateAndDeleteButtion courseData={course}/>
              </div>
            )}
      </div>
    </div>
  );
};

export default CourseCard;
