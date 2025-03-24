import { Link } from "react-router-dom";
import "./AdminSideBar.css";

const AdminSideBar = () => {
  return (
    <div className="admin-sidebar-content">
        <Link className="sidebar-link" to="/admin-dashboard/all-courses">
          All Courses
        </Link>
        <Link className="sidebar-link" to="/admin-dashboard/visitor-data">
          Visitors
        </Link>
        <Link className="sidebar-link" to="/admin-dashboard/add-course">
          Add Course
        </Link>
        <Link className="sidebar-link" to="/admin-dashboard/add-product">
          Add Food
        </Link>
    </div>
  );
};

export default AdminSideBar;
