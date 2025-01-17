import React, { useState } from 'react';
import './LandingPage.css';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [isModalOpen, setModalOpen] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        navigate("/courseDes/64e0c36eec5d32490e9f22d7");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!name || !email || !phone || !password) {
                throw new Error("Please fill in all fields.");
            }

            const sanitizedEmail = email.trim();
            const sanitizedName = name.trim();
            const sanitizedMobile = phone.trim();
            const sanitizedPassword = password.trim();

            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/signup', {
               name: sanitizedName,
                email: sanitizedEmail,
                mobile: sanitizedMobile,
                password: sanitizedPassword
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            toast.success("Thank you for the signup. Please login");
            navigate("/courseDes/64e0c36eec5d32490e9f22d7");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
            } else {
                alert(error.message);
            }
        } finally {
            closeModal();
        }
    };

    return (
        <div className="workshop-container">
            <button className="open-modal-button" onClick={openModal}>Register Now</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content scrollable">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <header className="header">
                            <h1>Congrats! You're One Step Away from Mastering ReactJS</h1>
                        </header>
                        <section className="form-section">
                            <form onSubmit={handleSubmit} className="registration-form">
                                <label>
                                    Full Name*
                                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </label>
                                <label>
                                    Email Address*
                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </label>
                                <label>
                                    Password*
                                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                                </label>
                                <label>
                                    Mobile Number (WhatsApp Number)*
                                    <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                </label>
                                <button type="submit" className="cta-button">Register</button>
                            </form>
                            <p className="terms">
                                By proceeding, you agree to our <a href="https://www.geneussolutions.in/privacy">Terms, Privacy and Refund Policy</a>.
                            </p>
                        </section>

                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;