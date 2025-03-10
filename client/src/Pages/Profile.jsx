import React, { useState }   from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../features/auth/authSlice";
import { useDeleteUserMutation } from "../features/auth/authApiSlice";
import { apiSlice } from "../app/api/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PopUp from "./adminPages/visitorData/PopUp";

const Profile = () => {
 
  const [deleteUser] = useDeleteUserMutation();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);

  const handleDeleteUser = async (id) => {
    try{
      const res = await deleteUser(id).unwrap();
      dispatch(apiSlice.util.resetApiState());
      dispatch(logOut());
      navigate('/')
      toast.info(res);
    }catch(error){
      console.log('this  is error when ddelter the user', error);
      toast.error(error?.data?.message);
    }
  }

  const handleNoClick = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-content">
        <div className="profile-form">
          <div className="profile-fields">
            <label>Student Name:</label>
            <input type="text" value={user.name} readOnly />
            <label>Mobile:</label>
            <input type="text" value={user.mobile} readOnly />
            <label>Email ID:</label>
            <input type="text" value={user.email} readOnly />
          </div>
        </div>
      </div>
      <div className="delete-btn-contanier">
        <button className="delete-profile-button"
        //  onClick={()=>handleDeleteUser(user?.id)} 
        onClick={()=>setShowPopUp(!showPopUp)}
         >Delete Profile</button>

         {
          showPopUp && (
            <PopUp title="Are you sure to delete your account?" handleYesClick={()=>handleDeleteUser(user?.id)} handleNoClick={handleNoClick}/>
          )
         }
      </div>
    </div>
  );
};

export default Profile;
