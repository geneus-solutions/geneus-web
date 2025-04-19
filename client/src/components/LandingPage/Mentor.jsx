import React from "react";
import "./Mentor.css";
import mentorImage from '../../assets/MentorImage.png'

const Mentor = () => {
  return (
    <div className="mentor-container">
      <h1>
        MEET YOUR <span className="highlight">MENTOR</span>
      </h1>
      <div className="mentor-content">
        <div>
        <img
          src={mentorImage}
          alt="Mentor"
          className="mentor-image"
          />
          <h2 className="mentor-name">Jagdish Sail</h2> 
          </div>
        <div className="mentor-details">
          <ul>
            <li>12+ years in IT, Technical Leader at World's largest bank</li>
            <li>BE from RV College of Engineering, Bangalore.</li>
            <li>Expert in Full Stack Development, ReactJS, Java.
            </li>
            <li>Specialized in Spring Boot, Angular, MERN stack.</li>
            <li>Trained 5000+ in tech, web design skills</li>
         </ul>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
