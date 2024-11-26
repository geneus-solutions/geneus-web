import React from 'react';
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// import { useAuthenticateQuery } from '../../features/authenticate/authenticateApiSlice';
import { useSelector } from 'react-redux';
import { useAuthenticateQuery } from '../../features/authenticate/authenticateApiSlice';

function Navbar() {

  // const { data } = useAuthenticateQuery();
  // console.log('data', data);
  // const user = useSelector(state => state.auth.user);
  // console.log('user2580 : ', user);
  // console.log('user', user);

  const {data,isError,error} = useAuthenticateQuery();
  // if(isError){
  //   console.log('error2580 : ', error);
  // }
  // console.log('data2580 : ', data);

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
              <div className="nav-link dropdown-toggle" id="servicesDropdown">
                Services
              </div>
              <div className="dropdown-menu" aria-labelledby="servicesDropdown">
                <NavLink 
                  to="/courses" 
                  className="dropdown-item"
                >
                  Courses
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
              {data?.data?.id ? <div>
                <p>{data?.data?.name}</p>
              </div>:
              <div className="login-button" >
                <p>Login</p>
              </div>}
              </NavLink>
             
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
