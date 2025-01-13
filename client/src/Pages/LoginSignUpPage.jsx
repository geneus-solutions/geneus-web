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
        {
            location?.pathname === '/login' ? <Login/> : <Signup/>
        }
      </div>
      <div className="image-container">
        <div className="overlay">
          <h1>Welcome! Log in to start learning.</h1>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
