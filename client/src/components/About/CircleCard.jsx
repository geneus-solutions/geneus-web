import React from "react";
import "./CircleCard.css";

const CircleCard = ({ icon, title, description, gradient }) => {
  return (
    <div
      className="circle-card"
      style={{
        background: `linear-gradient(white, white) padding-box, ${gradient} border-box`,
        border: "3px solid transparent",
        borderRadius: "50%", // Circular shape
      }}
    >
      {/* Icon */}
      <div className="circle-icon">{icon}</div>
      {/* Title */}
      <h3 className="circle-title">{title}</h3>
      {/* Fixed Height Description Container */}
      <div className="circle-description-container">
        <p className="circle-description">{description}</p>
      </div>
    </div>
  );
};

export default CircleCard;
