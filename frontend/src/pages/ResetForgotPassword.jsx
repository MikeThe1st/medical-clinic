import React, { useState } from "react";
import "../css/ForgotPassword.css";
import axios from 'axios'

const ResetForgotPassword = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/backend/user/forgot-password', { email: email })
      console.log('Response:', response)
      if (response.status == 201) {
        console.log('Response:', response.data)
        alert(`Password reset request sent to ${email}.`)
        // alert(`Please write down your current password: ${response.data.newPassword}`)
        window.location.href = '/login'
      }
      else {
        alert(response.data.msg || 'Unexpected response from server');
      }

    } catch (error) {
      if (error.response && error.response.status === 404 || error.response.status === 400) {
        alert(error.response.data.msg || 'Resource not found');
      } else {
        alert('An error occurred. Please try again later.');
      }
      console.error('Error:', error);
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="text-center p-6 font-bold">Reset Forgotten Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container flex flex-col">
            <label>Enter email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="button-container-reset">
            <input type="submit" value="Reset Password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetForgotPassword;
