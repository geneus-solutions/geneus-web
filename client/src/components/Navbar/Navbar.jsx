import React from 'react';
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        {/* Logo Section */}
        <NavLink to="/" className="navbar-brand">
          <img 
            src="https://www.geneussolutions.in/static/media/GSMainLogo.e373ff51a56528f216e6.png" 
            alt="Logo" 
            className="logo-img"
          />
        </NavLink>

        {/* Toggler Button for Mobile View */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                About
              </NavLink>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" id="servicesDropdown">
                Services
              </span>
              <div className="dropdown-menu" aria-labelledby="servicesDropdown">
                <NavLink 
                  to="/course" 
                  className="dropdown-item"
                >
                  Course
                </NavLink>
                <NavLink 
                  to="/nutri-app" 
                  className="dropdown-item"
                >
                  Nutri App
                </NavLink>
              </div>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/login'>
              <div className="login-button">
                <p>Login</p>
              </div>
              </NavLink>
             
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
