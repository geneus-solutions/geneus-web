import {useState} from 'react'
import './Signup.css';

import { useSignupMutation } from '../../features/auth/authApiSlice';

function Signup() {

  const [signup,{isLoading}] = useSignupMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      console.log(formData);
      const data = await signup(formData).unwrap();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2 className="form-title">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="Name"  name='name' value={formData?.name} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" name='email' value={formData?.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input type="text" id="number" placeholder="Number" name='mobile' value={formData?.mobile} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" name='password' value={formData?.password} onChange={handleChange} />
          </div>
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
      <div className="image-container">
        <div className="overlay">
          <h1>Lorem ipsum dolor sit amet, consectetur</h1>
        </div>
      </div>
    </div>
  )
}

export default Signup