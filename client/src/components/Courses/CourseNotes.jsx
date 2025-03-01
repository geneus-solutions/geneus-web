import React from "react";
import "./CourseNotes.css";
import { Link } from "@mui/material";

const CourseNotes = ({ userDetail, courseDetails }) => {
  return (
    <div className="notes-card-content">
      <h4 className="notes-heading">Course Notes</h4>
      {/* {userDetail?.userId !== -1 ? (
        <p>
          <Link
            to={courseDetails?.notes?.notesUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {courseDetails?.notes?.notesTitle}
          </Link>
        </p>
      ) : (
        <p>Get the full course notes by purchasing the course today.</p>
      )} */}
      <p>Get the full Course Notes by purchasing the course today.</p>
    </div>
  );
};

export default CourseNotes;
