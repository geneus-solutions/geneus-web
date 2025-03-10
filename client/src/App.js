import React,{useCallback,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "./features/auth/authApiSlice";

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

// import Mylearning from "./components/MyLearning/MyLearning";
import MyLearning from "./Pages/MyLearning";
import ForgotPasswordPage from "./components/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./components/ResetPassword/ResetPassword";
import { logOut } from "./features/auth/authSlice";

import LandingPage from "./Pages/landingPage/LandingPage";
import VisitorData from "./Pages/adminPages/visitorData/VisitorData";
import PrivacyPolicy from "./components/privacyPolicy/PrivacyPolicy";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import Profile from "./Pages/Profile";
import AllCourses from "./components/admin/AllCourses";

const INACTIVITY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function App() {
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = useCallback(async () => {
    try {
      if (!user?.id) return;
      const data = await logout().unwrap();
      console.log("User logged out:", data);
      dispatch(logOut());
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }, [user?.id, dispatch, logout]);

  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      if (!user?.id) return;
      clearTimeout(timeout);
      timeout = setTimeout(handleLogout, INACTIVITY_TIME);
    };

    const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    if (user?.id) {
      resetTimer();
    }

    return () => {
      clearTimeout(timeout);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [handleLogout, user?.id]);

  return (
    <Router>
      <div>
      <PrivacyPolicy/>
      <Routes>
        <Route path="/login" element={<LoginSignUpPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
          <Route path="/landing/:id" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage/>}/>

          <Route element={<RequireAuth allowedRole={["user", "admin"]} />}>
            <Route path="/nutri-app" element={<CalorieCalculator />} />
            <Route path="/plan-diet" element={<AddFood />} />
            <Route path="/diet-plan" element={<DietPlan />} />
            <Route path="/course-details" element={<CheckOutCourseDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Admin-specific routes */}
          <Route element={<RequireAuth allowedRole={["admin"]} />}>
            {/* Add here your admin specific route */}
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/visitor-data" element={<VisitorData/>}/>
            <Route path="/all-courses" element={<AllCourses/>}/>
          </Route>
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDescriptionPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
