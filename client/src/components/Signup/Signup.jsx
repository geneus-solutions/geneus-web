import React from 'react'
import './Signup.css';
function Signup() {
  return (
    <div className="signup-container">
      <div className="form-container">
        <h2 className="form-title">Signup</h2>
        <form>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" placeholder="Name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input type="text" id="number" placeholder="Number" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" />
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