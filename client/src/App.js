import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Course from "./components/Course/Course";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import CourseDescription from "./components/CourseDescription/CourseDescription";
import Cart from "./components/Cart/Cart";
import { set } from "./redux/slices/cartCount";
import { useSelector, useDispatch } from "react-redux";
import { addUserDetails, userInfo } from "./redux/slices/userDetails";
import NutritionalAndCalorieCalculator from "./components/Nutritional/NutritionalAndCalorieCalculator";


import { backendUrl } from "./config";
import Learning from "./components/Learning/Learning";
axios.defaults.withCredentials = true;

const App = () => {
    const [searchResults, setSearchResults] = useState([]);

    const dispatch = useDispatch();
    const userDetail = useSelector(userInfo);
    useEffect(() => {
        fetchCourses();
        userDetails();
    }, []);

    useEffect(() => {
        if (userDetail.isLoggedIn) {
            fetchCartDetails();
        }
    }, [userDetail.isLoggedIn]);

    const fetchCartDetails = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}/cart?user_id=${userDetail.userId}`
            );
            dispatch(set(response.data.cart_items.length));
        } catch (error) {
            console.error("Failed to fetch course data:", error);
        }
    };

    const userDetails = async () => {
        try {
            const response = await axios.post(`${backendUrl}/userAuth`);
            if (!response.data.authorized) {
                console.log(response.data.authorized);
            } else {
                console.log(response.data.authorized);
                setUserDetailsData(response.data);
            }
        } catch (error) {
            console.log("user not logged in :", error);
        }
    };

    const setUserDetailsData = (data) => {
        const newUserDetails = {
            isLoggedIn: data.authorized,
            username: data.username,
            useremail: data.useremail,
            userId: data.userId,
        };
        dispatch(addUserDetails(newUserDetails));
    };

    const handleSearch = (query) => {
        const filteredCourses = courses.filter((course) =>
            course.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredCourses);
    };

    return (
        <Router>
            <ToastContainer theme="colored" position="top-center" />
            <Navbar onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Banner />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/nutritional" element={<NutritionalAndCalorieCalculator />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
