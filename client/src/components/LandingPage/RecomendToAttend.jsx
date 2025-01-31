import React from "react";
import "./RecomendToAttend.css";

const RecomendToAttend = ({ title, heading, description, imageUrl }) => {
  return (
    <div className="recomend-to-attend">
      <div className="picture-tree-webp">
        <img className="recomend-image" src={imageUrl} />
        <p className="you-re-a-beginner">
          <span className="text-wrap">You're A </span>

          <span className="span">{title}</span>
            {" "}
          <span className="text-wrap">{heading}</span>
        </p>

        <p className="from-students-to">{description}</p>
      </div>
    </div>
  );
};

export default RecomendToAttend;
