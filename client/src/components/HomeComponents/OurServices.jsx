import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/courses.jpg";
import img2 from "../../assets/nutriImage.jpg";
import "./OurServices.css";

function OurServices() {
  const navigate = useNavigate();
  return (
    <div className="our-services-container">
      {/* Title Section */}
      <div className="our-services-title-section">
        <div className="lines-container">
          <div className="line long"></div>
          <div className="line short"></div>
        </div>
        <h2 className="our-services-title">Our Services</h2>
        <div className="lines-container">
          <div className="line long"></div>
          <div className="line short"></div>
        </div>
      </div>

      {/* Services Cards */}
      <div className="services-container">
        {/* Courses Card */}
        <div className="service-card" onClick={() => navigate("/courses")}> 
          <img src={img1} alt="Courses" className="service-image" />
          <div className="overlay">
            <h3 className="overlay-text">Courses</h3>
          </div>
        </div>

        {/* Nutrition App Card */}
        <div className="service-card" onClick={() => navigate("/nutri-app")}>
          <img src={img2} alt="Nutrition App" className="service-image" />
          <div className="overlay">
            <h3 className="overlay-text">Nutrition App</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurServices;
