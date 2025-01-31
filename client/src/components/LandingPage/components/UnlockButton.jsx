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
        state: { cartDetails: course, totalPrice: course?.discount_price },
      });
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
