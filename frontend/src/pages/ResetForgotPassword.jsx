import React, { useState } from "react";
import "../css/ForgotPassword.css";

const ResetForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would add your logic for handling the email submission.
    // This could involve sending the email to your backend server to initiate the password reset process.

    alert(`Password reset request sent to ${email}.`)
    alert(`Please write down your current password:`)
  };

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
          <div className="button-container">
            <input type="submit" value="Reset Password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetForgotPassword;
