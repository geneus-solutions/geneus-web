import React from "react";
import mentor from "../../assets/MentorImage.png";
import "./InstructorCard.css";

const InstructorCard = ({ mentorImage }) => {
  return (
    <div className="main-instructor-card">
      <h2 className="instructor-heading">Instructor</h2>
      <div className="instructor-card">
        <div className="instructor-info">
          <div className="instructor-photo">
            <img src={mentor} alt="Instructor" width={200} />
          </div>
          <div className="instructor-details">
            <p>Full Stack Developer</p>
            <h2>JAGDISH SAIL</h2>
          </div>
        </div>
        {mentorImage?.mentorImage && (
          <div className="instructor-description">
            <img src={mentorImage?.mentorImage} alt="Mentor"></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCard;
