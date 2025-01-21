import React, { useState } from "react";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import "./LoginSignUpPage.css";

const LoginSignUpPage = ({isLoginDialogOpen, setIsLoginDialogOpen}) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        {showLogin ? <Login toggleComponent={toggleComponent} isLoginDialogOpen={isLoginDialogOpen} setIsLoginDialogOpen={setIsLoginDialogOpen} /> : <Signup toggleComponent={toggleComponent} />}
      </div>
      {/* <div className="image-container">
        <div className="overlay">
          <h1
            style={{
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)",
            }}
          >
            Welcome!
            <br />
            {showLogin ? "Log in to start learning." : "Signup to start learning."}
          </h1>
        </div> 
      </div> */}
    </div>
  );
};

export default LoginSignUpPage;
