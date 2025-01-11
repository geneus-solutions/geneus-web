import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
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
import { setIsDropdownOpen } from "../../features/dropDown/dropDownSlice";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector((state) => state.dropdown.isDropdownOpen);

  const { data } = useAuthenticateQuery();
  const { data: cartData } = useCartQuery(data?.data?.id, {
    skip: !data?.data?.id,
  });


  const [logout, /*{ isLoading, isSuccess, isError, error }*/] = useLogoutMutation();

  useEffect(() => {
    if (cartData) {
      dispatch(Cart({ cart: cartData }));
    }
  }, [cartData, dispatch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-info")) {
        dispatch(setIsDropdownOpen(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleLogout = async () => {
    const data = await logout().unwrap();
    setIsDropdownOpen(!isDropdownOpen);
    console.log(data);
  };

  // for admin role
  const isAdmin = data?.data?.role === "admin"; //We can change from here like if you want to change

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

            {data?.data?.id&&<li className="nav-item">
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
              {data?.data?.id ? (
                <div className="user-info dropdown">
                  <div
                    className="avatar"
                    onClick={() => dispatch(setIsDropdownOpen(!isDropdownOpen))}
                  >
                    {data?.data?.name.charAt(0).toUpperCase()}
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
                  <div className="login-button">
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
