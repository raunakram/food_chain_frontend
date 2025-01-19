import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    // let token = JSON.parse
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('email', input.email)
        formData.append('password', input.password)
        axios.post('http://127.0.0.1:8000/api/login/', formData)
            .then(data => {
                console.log('Success:', data.data.token.access);
                window.localStorage.setItem("token", (data.data.token.access))
                window.localStorage.setItem("user_type", data.data.user.user_type)
                console.log(data)
                navigate('/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }



    const handleGoogleLoginSuccess = (response) => {
        const token = response.credential;
        console.log(token, "token----------------->>>>>>")
        axios.post('http://127.0.0.1:8000/auth-login-google/', { token })
            .then(data => {
                console.log('Google login success:', data.data.access);
                window.localStorage.setItem("user_type", data.data.user.user_type)
                window.localStorage.setItem("token", data.data.access);
                navigate('/');
            })
            .catch(error => {
                console.error('Google login error:', error);
            });
    };


    return (
        <>
            <GoogleOAuthProvider clientId="295456515041-8l82k4dhhi89id7k4v4sd857ud3ack7p.apps.googleusercontent.com">
                <div className='register'>
                    <div className='register-box'>
                        <h2> Login </h2>
                        <form onSubmit={handleSubmit}>
                            {/* Email Address */}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={input.email}
                                    name='email'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    aria-describedby="emailHelp"
                                    value={input.password}
                                    name='password'
                                    onChange={handleInputChange}

                                />
                            </div>
                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                        <div>
                            <a href='/forgot-password'>Forgot password?</a>
                        </div>
                        {/* <div>
                        <a href='http://127.0.0.1:8000/auth/login/google-oauth2/'>Login using google auth</a>
                    </div> */}
                        <div style={{ marginTop: "20px" }}>
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() => console.log("Google login failed")}
                            />
                        </div>
                    </div>
                </div>
            </GoogleOAuthProvider>
        </>
    )
}
