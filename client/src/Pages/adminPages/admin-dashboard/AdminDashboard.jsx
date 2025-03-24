import { useState } from "react";
import "./AdminDashboard.css";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${menuOpen ? "active" : ""}`}>
        <AdminSideBar />
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
