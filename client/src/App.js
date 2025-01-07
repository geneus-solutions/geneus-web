import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RequireAuth from "./RequireAuth/RequireAuth";

//Pages
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import CalorieCalculator from "./Pages/CalorieCalculator";
import AddFood from "./Pages/AddFood";
import DietPlan from "./Pages/DietPlan";
import Cart from "./Pages/Cart";
import CheckOutCourseDetails from "./Pages/CheckOutCourseDetails";
import AddProduct from "./Pages/adminPages/addProduct/AddProduct";
import AddCourse from "./Pages/adminPages/addCourse/AddCourse";
import CourseDescriptionPage from "./Pages/CourseDescritptionPage";
import LoginSignUpPage from "./Pages/LoginSignUpPage";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignUpPage />} />
        <Route path="/signup" element={<LoginSignUpPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route element={<RequireAuth allowedRole={["user", "admin"]} />}>
            <Route path="/nutri-app" element={<CalorieCalculator />} />
            <Route path="/plan-diet" element={<AddFood />} />
            <Route path="/diet-plan" element={<DietPlan />} />
            <Route path="/course-details" element={<CheckOutCourseDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Admin-specific routes */}
          <Route element={<RequireAuth allowedRole={["admin"]} />}>
            {/* Add here your admin specific route */}
            {/* <Route path="/add-course" element={<AddCourse />} /> */}
            {/* <Route path="/add-product" element={<AddProduct />} /> */}
          </Route>
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDescriptionPage />} />
        </Route>
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
