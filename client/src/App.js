import React from "react";

import RequireAuth from "./RequireAuth/RequireAuth";

import Layout from "./components/Layout/Layout";
import Home from "./Pages/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Courses from "./components/Courses/Courses";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Cource from "./components/Courses/Course";

import Product from "./components/Product/Product";

import CalorieCalculator from "./Pages/CalorieCalculator";
import AddFood from "./Pages/AddFood";
import DietPlan from "./Pages/DietPlan";
import Cart from "./components/Cart/Cart";
import CheckOutCourseDetails from "./components/Cart/CheckOutCourseDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/Product" element={<Product />} />
          <Route element={<RequireAuth allowedRole={["user", "admin"]} />}>
            <Route path="/nutri-app" element={<CalorieCalculator />} />
            <Route path="/plan-diet" element={<AddFood />} />
            <Route path="/diet-plan" element={<DietPlan />} />

            {/* Admin-specific routes */}
            <Route element={<RequireAuth allowedRole={["admin"]} />}>
              {/* Add here your admin specific route */}
              {/* <Route path="/add-course" element={<AddCourse />} /> */}
              {/* <Route path="/add-product" element={<AddProduct />} /> */}
            </Route>
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<Cource />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/course-details" element={<CheckOutCourseDetails />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
