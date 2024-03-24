import React, { useState } from "react"
import "../css/ForgotPassword.css"
import { useLocation } from "react-router-dom"
import axios from "axios"

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('login')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.")
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/backend/user/reset-password', { newPassword, confirmPassword, login: query }, { withCredentials: true })
      console.log('Response:', response)
      if (response.status === 201) {
        alert('Password changed.')
        window.location.href = '/'
      }
      else alert(response.data.msg)
    } catch (error) {
      console.error('Error:', error)
      const { msg } = error.response.data
      if (msg) {
        alert(msg)
      }
    }
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
