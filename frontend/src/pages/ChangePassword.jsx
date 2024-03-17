import React, { useState } from "react"
import "../css/ForgotPassword.css"

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.")
      return
    }

    alert("Password has been successfully changed.")
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Change Password</h2>
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
            <input type="submit" value="Change Password" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
