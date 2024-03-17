import React, { useState } from "react";
import "../css/ForgotPassword.css";

const ChangePassword = () => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz dodać swoją logikę obsługi resetowania hasła
    setMessage("Password reset request sent."); // Przykładowy komunikat
  };

  const handlePasswordChangeConfirmation = () => {
    // Tutaj możesz dodać logikę potwierdzającą zmianę hasła
    // Na przykład, możesz wysłać żądanie do serwera w celu zaktualizowania hasła
    setMessage("Password changed successfully."); // Przykładowy komunikat
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Reset Forgotten Password</h2>
        <form onSubmit={handleSubmit}>
        
          <div className="input-container">
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <input type="submit" value="Reset Password" />
          </div>
          <div className="button-container">
            <button onClick={handlePasswordChangeConfirmation}>
              Confirm Password Change
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
