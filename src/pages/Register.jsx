import React, { useState } from 'react';
import '../scss/register.scss'
export const Register = () => {


  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      phone,
      firstName,
      lastName,
      password,
      "user_type": "admin"
    };


    console.log('Form Data:', formData);


    fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };


  return (
    <div className='register'>
      <div className='register-box'>
        <h2> Register </h2>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPhone"
              aria-describedby="phoneHelp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="exampleInputFirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputFirstName"
              aria-describedby="firstNameHelp"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="exampleInputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputLastName"
              aria-describedby="lastNameHelp"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              User Type
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              defaultValue='admin'
            />
          </div>

          {/* Checkbox */}
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
