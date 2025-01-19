import React, { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {

    const [input, setInput] = useState({
        email: "",
    })

    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("email", input.email)
        await axios.post('http://127.0.0.1:8000/api/reset-password/', formData).then(response => {
            console.log(response.data.msg, "response=====>>>>")
            setResponseMessage(response.data.msg);
        }).catch((error) => {
            console.error('Error:', error);
            setResponseMessage('Error:', error);

        });
    }

    return (
        <div className='register'>
            <div className='register-box'>
                <form onSubmit={handleSubmit}>
                    <h1>Please enter your email address</h1>
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
                            onChange={(e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }
                            ))}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
                <h4>{responseMessage}</h4>
            </div>

        </div>
    )
}

export default ForgotPassword