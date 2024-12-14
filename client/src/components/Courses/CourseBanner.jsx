import React from "react";
import "./CourseBanner.css";

const CourseBanner = ({ imgSrc, course }) => {
  return (
    <div className="course-section-container">
      <img src={imgSrc} alt="Course" className="course-section-image" />
      <div className="course-section-overlay">
        <div className="course-section-content">
          <h5 className="course-section-subtitle">A Course You'll Actually Finish</h5>
          {course && (
            <>
              <h2 className="course-section-title">{course?.title}</h2>
              <p className="course-section-description">
                {course?.description}
              </p>
              <button className="course-section-button">Enroll now</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;
