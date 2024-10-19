import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "./components/Banner/Banner";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import {  set } from "./redux/slices/cartCount";
import { useSelector, useDispatch } from "react-redux";
import { addUserDetails, userInfo } from "./redux/slices/userDetails";
import NutritionalAndCalorieCalculator from "./components/Nutritional/NutritionalAndCalorieCalculator";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Courses from "./components/Courses/Courses";
import { backendUrl } from "./config";
import Learning from "./components/Learning/Learning";
import Header from "./components/Header/Header";
import About from "./components/About/About";
axios.defaults.withCredentials = true;

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const userDetail = useSelector(userInfo);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.post(`${backendUrl}/userAuth`);
                if (response.data.authorized) {
                    setUserDetailsData(response.data);
                } else {
                    console.log("User not authorized");
                }
            } catch (error) {
                console.error("User not logged in:", error);
              //  toast.error("Failed to authenticate user.");
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (userDetail.isLoggedIn) {
            fetchCartDetails();
        }
    }, [userDetail.isLoggedIn]);

    const fetchCartDetails = async () => {
        try {
            const response = await axios.get(`${backendUrl}/cart?user_id=${userDetail.userId}`);
            dispatch(set(response.data.cart_items.length));
        } catch (error) {
            console.error("Failed to fetch cart details:", error);
            toast.error("Failed to fetch cart details.");
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
        // Assuming you have a list of courses to filter from
        const filteredCourses = searchResults.filter((course) =>
            course.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredCourses);
    };

    return (
        <Router>
            <ToastContainer theme="colored" position="top-center" />
            <Header onSearch={handleSearch} />
            <Routes>
                <Route path="/" element={<Banner />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/nutriapp" element={<NutritionalAndCalorieCalculator />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;