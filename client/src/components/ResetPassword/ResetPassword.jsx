import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Import the CSS file

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    useEffect(() => {
        if (!token) {
            setMessage('Invalid or expired token');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, { token, password });
            if (response.status === 200) {
                setMessage('Password has been reset successfully. Please log in.');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 3000); // Redirect after 3 seconds
            } else {
                setMessage(response.data || 'Error resetting password');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error resetting password');
        }
    };

    return (
        <div className="reset-password-container mt-5"> {/* Use the new wrapper class */}
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="text-center text-primary">Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">New Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                    </form>
                    {message && <p className="mt-3 text-center text-danger">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;