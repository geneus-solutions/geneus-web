import React, { useState } from "react";
import "./UnlockButton.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import Login from "../../Login/Login";
import LoginSignUpPage from "../../../Pages/LoginSignUpPage";
import { useNavigate } from "react-router-dom";

const UnlockButton = ({ course }) => {
  const user = useSelector(selectCurrentUser);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      navigate("/course-details", {
        state: { 
          cartDetails: {
            cart_items: [{
          course_course_description: course?.description,
          course_discountPrice: course?.discount_price,
          course_id: course?._id,
          course_image: course?.img,
          course_price: course?.price,
          course_title: course?.title,
        }], 
        cart_total: course?.price, 
        discount : course?.discount_price,
        total_after_discount: course?.price - course?.discount_price, 
      },
    totalPrice: course?.discount_price, 
      }});
    } else {
      setIsLoginDialogOpen(true);
    }
  };

  return (
    <>
      <button className="link" onClick={handleButtonClick}>
        <p className="unlock-AI-trading">
          <span className="text-wrapper-8">
            Checkout
            <br />
          </span>
          <span className="text-wrapper-9">{course?.price}</span>{" "}
          <span className="text-wrapper-8">
            Rs.{course?.discount_price}/- Only
          </span>
        </p>
      </button>
      {isLoginDialogOpen && (
        <LoginSignUpPage
          isLoginDialogOpen={isLoginDialogOpen}
          setIsLoginDialogOpen={setIsLoginDialogOpen}
          course={course}
        />
      )}
    </>
  );
};

export default UnlockButton;
