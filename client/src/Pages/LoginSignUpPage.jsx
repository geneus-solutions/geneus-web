import React, { useEffect, useState } from "react";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import "./LoginSignUpPage.css";

const LoginSignUpPage = ({
  isLoginDialogOpen,
  setIsLoginDialogOpen,
  course,
}) => {
  const [showLogin, setShowLogin] = useState(!isLoginDialogOpen);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
      <div className="signup-container">
         {isLoginDialogOpen && (
          <p className="close-button" onClick={() => setIsLoginDialogOpen(!isLoginDialogOpen)}>
          close
          </p>
        )}
        <div className="form-container">
          {showLogin ? (
            <Login
              toggleComponent={toggleComponent}
              isLoginDialogOpen={isLoginDialogOpen}
              setIsLoginDialogOpen={setIsLoginDialogOpen}
              course={course}
            />
          ) : (
            <Signup
              toggleComponent={toggleComponent}
              isLoginDialogOpen={isLoginDialogOpen}
              setIsLoginDialogOpen={setIsLoginDialogOpen}
              course={course}
            />
          )}
        </div>
      </div>
  );
};

export default LoginSignUpPage;
