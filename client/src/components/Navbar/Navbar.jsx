import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { IoMdArrowDropdown } from "react-icons/io";

// import { useAuthenticateQuery } from '../../features/authenticate/authenticateApiSlice';
import { MDBBadge } from "mdbreact";
import { CgProfile } from "react-icons/cg";
import { FaCartArrowDown } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useAuthenticateQuery } from "../../features/authenticate/authenticateApiSlice";
import { useCartQuery } from "../../features/Cart/cartApiSlice";
import { Cart } from "../../features/Cart/cartSlice";

function Navbar() {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data } = useAuthenticateQuery();
  const { data: cartData } = useCartQuery(data?.data?.id, {
    skip: !data?.data?.id,
  });

  useEffect(() => {
    if (cartData) {
      dispatch(Cart({ cart: cartData }));
    }
  }, [cartData, dispatch]);

  // for admin role
  const isAdmin = data?.data?.role === "admin"; //We can change from here like if you want to change

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
            <li className="nav-item">
              {data?.data?.id ? (
                <div className="user-info dropdown">
                  <div
                    className="avatar"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {data?.data?.name.charAt(0).toUpperCase()}
                  </div>
                  {isDropdownOpen && (
                    <div className="avatar-dropdown-menu">
                      <NavLink to="/profile" className="avatar-dropdown-item" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                          <CgProfile />
                          Profile
                      </NavLink>
                      <NavLink to="/cart" className="avatar-dropdown-item" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <FaCartArrowDown />
                        <MDBBadge className="badge-notification">
                          {cartData?.cart_items?.length
                            ? cartData?.cart_items?.length
                            : 0}
                        </MDBBadge>
                        Cart
                      </NavLink>
                      <NavLink to="/login" className="avatar-dropdown-item" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <AiOutlineLogout /> Logout
                      </NavLink>
                    </div>
                  )}
                  {/* If you still want to show the name next to the avatar, you can uncomment the next line */}{" "}
                  {/* <p style={{ marginTop: "10px" }}>{data?.data?.name}</p> */}{" "}
                </div>
              ) : (
                <NavLink to="/login">
                  <div className="login-button">
                    <p style={{ marginTop: "10px" }}>Login</p>
                  </div>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
