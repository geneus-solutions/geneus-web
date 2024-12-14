import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: "1" , minHeight: '100vh'}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
