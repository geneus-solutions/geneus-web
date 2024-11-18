import React from 'react'
import './Login.css'
function Login() {
  return (
    <div className="signup-container">
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form>
       
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
        </div>
      
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="signup-button">Login</button>
      </form>
      <div className="login-link">
        Dont have ACCOUNT? <a href="/signup">Signup</a>
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

export default Login