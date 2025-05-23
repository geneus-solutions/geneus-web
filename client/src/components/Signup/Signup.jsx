import { useState } from "react";
import "./Signup.css";

import { useLoginMutation, useSignupMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import VerifyAccount from "../../Pages/verifyAccount";
import { useSendOTPMutation } from "../../features/verifyAccount/verifyAccountApiSlice";

function Signup({ toggleComponent, isLoginDialogOpen, setIsLoginDialogOpen, course }) {

  const [openVerifyPage, setOpenVerifyPage] = useState(false);

  const [sendOTP,{isLoading:isSendOtpLoading}] = useSendOTPMutation();
  const [signup, {isLoading: signUpIsLoading}] = useSignupMutation();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname ||  "/";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleVerifyNav = async() => {
    try {

      const userData = await login({ email:formData?.email, password:formData?.password }).unwrap();

      console.log('userData : ',userData)
      
      if (userData?.user?.id) { 
        console.log('All things are good')
        toast.success("Signed up successfully");
        dispatch(setCredentials({ ...userData }));
        navigate("/course-details", { state: { courses:[course] } } );
        setIsLoginDialogOpen(false);
      }

    } catch (error) {
      toast.error(error?.data?.error);
    }
  }

// console.log('this is isLoginDialog', isLoginDialogOpen)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {user} = await signup(formData).unwrap();
      console.log('user : ',user)
      if (isLoginDialogOpen) { 
        const optResponse = await sendOTP({ email:formData?.email }).unwrap();
        console.log('optResponse : ',optResponse)
        if (optResponse?.success === true) {
          setOpenVerifyPage(true);
        }
        return;
      } if(!isLoginDialogOpen) { 
        navigate(from, { replace: true })}
        return;
      // toggleComponent();
      // navigate("/login");
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  return (
    <div className="signup-form">
      {!openVerifyPage&&<div>
        <h2 className="form-title">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input
              type="text"
              id="number"
              placeholder="Number"
              name="mobile"
              value={formData?.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="signup-button">
            {(signUpIsLoading||isSendOtpLoading) ? "Please wait...." : "Signup"}
          </button>
        </form>
        <div className="login-link">
            Already have an account? <button type="button" onClick={toggleComponent}>Login</button>
        </div>
      </div>}
      {(openVerifyPage && formData?.email)&&<VerifyAccount email={formData?.email} handleVerifyNav={handleVerifyNav} />}
    </div>
  );
}

export default Signup;


