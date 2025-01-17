import { useState } from "react";
import "./Signup.css";

import { useSignupMutation } from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

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
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error);
    }
  };

  return (
    <div>
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
          Signup
        </button>
      </form>
      <div className="login-link">
        If you have ACCOUNT? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
