import React from "react";
import '../../styles/CaloriePage.css'

const CaloriePage = () => {
  return (
    <div className="calorie-container">
      <div className="text-content">
        <h1>Personalized Diet Planning</h1>
        <p className="subtext">Calculates your BMI and get customized meal plans based on your dietary preferences, <br />helping you achieve your health goals effortlessly!</p>
        <div className="store-buttons">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="app-store"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="google-play"
          />
        </div>
      </div>
      <div className="image-section"></div>
      <div className="curvy-line"></div>
    </div>
  );
};

export default CaloriePage;
