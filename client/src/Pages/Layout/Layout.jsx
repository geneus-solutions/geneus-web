import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./Layout.css"; // Import CSS

function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        <Outlet />
      </div>
      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
