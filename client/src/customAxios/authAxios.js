import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${localStorage.getItem('token')}`,
    },
    withCredentials: true,
});