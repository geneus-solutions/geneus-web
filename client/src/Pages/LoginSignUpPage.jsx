import React from "react";
import Login from "../components/Login/Login";
import { useLocation } from "react-router-dom";
import "./LoginSignUpPage.css";
import Signup from "../components/Signup/Signup";

const LoginSignUpPage = () => {
  const location = useLocation();
  return (
    <div className="signup-container">
      <div className="form-container">
        {location?.pathname === "/login" ? <Login /> : <Signup />}
      </div>
      <div className="image-container">
        <div className="overlay">
          <h1
            style={{
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)",
            }}
          >
            Welcome!
            <br />
            {location?.pathname === "/login"
              ? " Log in to start learning."
              : "Signup to start learning."}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
