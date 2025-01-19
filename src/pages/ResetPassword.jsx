import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // To capture URL parameters
import axios from 'axios';

const ResetPassword = () => {
    const { uid, token } = useParams();
    const [input, setInput] = useState({
        password: "",
        password2: ""
    });
    const [message, setMessage] = useState('');

    const navigate = useNavigate()
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.password !== input.password2) {
            setMessage('Passwords do not match');
            return;
        }

        try {

            const response = await axios.post(`http://127.0.0.1:8000/api/user-reset-password/${uid}/${token}/`, {
                password: input.password,
                password2: input.password2
            });
            setMessage(response.data.msg);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (error) {

            if (error.response && error.response.data) {
                setMessage(error.response.data.errors || 'An error occurred');
            } else {
                setMessage('An error occurred');
            }
        }
    };

    return (
        <div className='register'>
            <div className='register-box'>
                <form onSubmit={handleSubmit}>
                    <h1>Reset Your Password</h1>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={input.password}
                            name='password'
                            onChange={(e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            value={input.password2}
                            name='password2'
                            onChange={(e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Reset Password
                    </button>
                </form>

                {message && <h4>{message}</h4>}
            </div>
        </div>
    );
};

export default ResetPassword;
