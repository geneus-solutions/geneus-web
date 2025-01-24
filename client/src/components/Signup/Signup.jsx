import { useState } from "react";
import "./Signup.css";

import { useLoginMutation, useSignupMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

function Signup({ toggleComponent, isLoginDialogOpen, setIsLoginDialogOpen, course }) {
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
console.log('this is isLoginDialog', isLoginDialogOpen)
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
      const data = await signup(formData).unwrap();
      toast.success(data?.message);
      const userData = await login({ email: formData.email, password: formData.password }).unwrap();
      dispatch(setCredentials({ ...userData }))
      if (isLoginDialogOpen) { 
        setIsLoginDialogOpen(false);
        navigate('/course-details', {
          state: { cartDetails: course, totalPrice: course?.discount_price }
        });
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
          {signUpIsLoading ? "Please wait...." : "Signup"}
        </button>
      </form>
      <div className="login-link">
          Already have an account? <button type="button" onClick={toggleComponent}>Login</button>
        </div>
    </div>
  );
}

export default Signup;


