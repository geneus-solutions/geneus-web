import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function Layout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar/>
      <div
        style={{
          flex: "1",
          minHeight: "100vh",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
