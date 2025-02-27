import React from "react";
import "./PopUp.css";

const PopUp = ({handleYesClick, handleNoClick}) => {
  return (
    <div class="popup-modal">
      <p class="popup-message">Are you sure to delete the visitor data?</p>
      <div class="popup-options">
        <button class="popup-btn-yes" onClick={()=>handleYesClick()}>Yes</button>
        <button class="popup-btn-no" onClick={()=>handleNoClick()}>No</button>
      </div>
    </div>
  );
};

export default PopUp;
