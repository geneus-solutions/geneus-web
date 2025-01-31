import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticateQuery } from "../../features/authenticate/authenticateApiSlice";
import { useCartQuery } from "../../features/Cart/cartApiSlice";
import { Cart } from "../../features/Cart/cartSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import logo from "../../assets/logo.png";
import { logOut } from "../../features/auth/authSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";

const Navbar = () => {
  
  const dispatch = useDispatch();
  // const isDropdownOpen = useSelector((state) => state.dropdown.isDropdownOpen);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 
  const [logout, /*{ isLoading, isSuccess, isError, error }*/] = useLogoutMutation();
  const user = useSelector(selectCurrentUser);
  const { data } = useAuthenticateQuery();
  const { data: cartData } = useCartQuery(data?.data?.id, {
    skip: !data?.data?.id,
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    if (cartData) {
      dispatch(Cart({ cart: cartData }));
    }
  }, [cartData, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if the click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const data = await logout().unwrap(); 
    setIsDropdownOpen(!isDropdownOpen);
    
    dispatch(logOut());
    try{
      const response = await logout().unwrap(); 
      console.log('this is response for logOut',response)
      setIsDropdownOpen(false);
      dispatch(logOut());
      navigate('/')

    }catch(error){
      console.log('this is logoutError', error)
    }
  };

  // for admin role
  const isAdmin = user?.role === "admin"; //We can change from here like if you want to change

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        {/* Logo Section */}
        <NavLink to="/" className="navbar-brand">
          <img
            src={logo}
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
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <div className="nav-link" id="servicesDropdown">
                Services <IoMdArrowDropdown className="dropdown-icon" />
              </div>
              <div className="dropdown-menu" aria-labelledby="servicesDropdown">
                <NavLink to="/courses" className="dropdown-item">
                  Courses
                </NavLink>
                <NavLink to="/nutri-app" className="dropdown-item">
                  Nutri App
                </NavLink>
              </div>
            </li>

            {/* Admin Dropdown */}
            {isAdmin && (
              <li className="nav-item dropdown">
                <div className="nav-link" id="adminDropdown">
                  Admin Menu <IoMdArrowDropdown className="dropdown-icon" />
                </div>
                <div className="dropdown-menu" aria-labelledby="adminDropdown">
                  <NavLink to="/add-course" className="dropdown-item">
                    Add Course
                  </NavLink>
                  <NavLink to="/add-product" className="dropdown-item">
                    Add Product
                  </NavLink>
                </div>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>

            {user?.id&&<li className="nav-item">
              <NavLink
                to="/my-learning"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                My Learning
              </NavLink>
            </li>}
            <li className="nav-item">
              {user ? (
                <div className="user-info dropdown" ref={dropdownRef}>
                  <div
                    className="avatar"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  {isDropdownOpen && (
                    <div className="avatar-dropdown-menu">
                      <NavLink
                        to="/login"
                        className="avatar-dropdown-item"
                        onClick={handleLogout}
                      >
                        <AiOutlineLogout /> Logout
                      </NavLink>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/login">
                  <div className="navbar-login-button">
                    <p style={{ marginTop: "10px" }}>Login</p>
                  </div>
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <NavLink
                to="/cart"
                className="avatar-dropdown-item"
              >
                <FaCartArrowDown />
                <div className="badge-notification">
                  {cartData?.cart_items?.length
                    ? cartData.cart_items.length
                    : 0}
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
