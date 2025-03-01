import React from "react";
import "./PopUp.css";

const PopUp = ({handleYesClick, handleNoClick}) => {
  return (
    <div className="popup-modal">
      <p className="popup-message">Are you sure to delete the visitor data?</p>
      <div className="popup-options">
        <button className="popup-btn-yes" onClick={()=>handleYesClick()}>Yes</button>
        <button className="popup-btn-no" onClick={()=>handleNoClick()}>No</button>
      </div>
    </div>
  );
};

export default PopUp;
