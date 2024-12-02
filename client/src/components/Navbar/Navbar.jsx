import React, { useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// import { useAuthenticateQuery } from '../../features/authenticate/authenticateApiSlice';
import { MDBIcon } from "mdbreact";
import { MDBBadge } from "mdbreact";
import { useDispatch } from 'react-redux';
import { useAuthenticateQuery } from '../../features/authenticate/authenticateApiSlice';
import { useCartQuery } from '../../features/Cart/cartApiSlice';
import { Cart } from '../../features/Cart/cartSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {data} = useAuthenticateQuery();
  const {data:cartData} = useCartQuery(data?.data?.id,{skip:!data?.data?.id});
  
  useEffect(() => {
    if(cartData){
      dispatch(Cart({cart:cartData}));
    }
  }, [cartData])

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
              <div className="nav-link dropdown-toggle" id="servicesDropdown" >
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
                <p style={{marginTop: "10px"}}>{data?.data?.name}</p>
              </div>:
              <div className="login-button" >
                <p style={{marginTop: '10px'}}>Login</p>
              </div>}
              </NavLink>
             
            </li>
            <li className="nav-item" style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
              <h4 className="linkText3">
                <MDBIcon icon="shopping-cart" size="x" />
                <MDBBadge
                    // color="primary"
                    style={{color:'black'}}
                    className="badge-notification"
                >
                  {cartData?.cart_items?.length ? cartData?.cart_items?.length : 0}
                      {/* {count} */}
                  </MDBBadge>
              </h4>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
