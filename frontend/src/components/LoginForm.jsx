import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Załóżmy, że używamy React Router

import "../css/Login.css";

const LoginForm = () => {

    const [failedLogins, setFailedLogins] = useState(0)
    const [ableToLogin, setAbleToLogin] = useState(true)

    useEffect(() => {
        if (failedLogins >= 3) {
            setAbleToLogin(false)
            const timeoutId = setTimeout(() => {
                setAbleToLogin(true)
            }, 10000)

            return () => clearTimeout(timeoutId)
        }
    }, [failedLogins])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!ableToLogin) return alert('You still cannot login! Wait few seconds before trying again.')

        const formData = new FormData(e.target)

        // Convert form data to JSON object
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value
        })

        try {
            const response = await axios.post('http://localhost:3000/backend/user/login', userData, { withCredentials: true })
            console.log('Response:', response)
            if (response.status === 200) {
                if (response.data.resetPassword) {
                    window.location.href = `/change-password?login=${response.data.login}`
                }
                else window.location.href = '/'
            }
            else alert(response.data)
        } catch (error) {
            console.error('Error:', error)
            setFailedLogins(failedLogins + 1)
            alert(`Failed logins ${failedLogins}`)
            const message = error.response.data.msg
            if (message) {
                alert(message)
            }
            if (failedLogins >= 3) return alert(`You cannot login for the next 10 seconds, because of ${failedLogins} failed attempts.`)
        }
    }

    const loginAsUser = async (e) => {
        e.preventDefault()
        if (!ableToLogin) return alert('You still cannot login! Wait few seconds before trying again.')
        try {
            const response = await axios.post('http://localhost:3000/backend/user/login', { email: 'user@gmail.com', password: 'user123' }, { withCredentials: true })
            if (response.status === 200) {
                if (response.data.resetPassword) {
                    window.location.href = `/change-password?login=${response.data.login}`
                }
                else window.location.href = '/'
            }
            else alert(response.data[0])
        } catch (error) {
            console.error('Error:', error)
            const message = error.response.data.msg
            if (message) {
                alert(message)
            }
        }
    }

    const loginAsAdmin = async (e) => {
        e.preventDefault()
        if (!ableToLogin) return alert('You still cannot login! Wait few seconds before trying again.')
        try {
            const response = await axios.post('http://localhost:3000/backend/user/login', { email: 'admin@gmail.com', password: 'admin123' }, { withCredentials: true })
            if (response.status === 200) {
                if (response.data.resetPassword) {
                    window.location.href = `/change-password?login=${response.data.login}`
                }
                else window.location.href = '/'
            }
            else alert(response.data[0])
        } catch (error) {
            console.error('Error:', error)
            const message = error.response.data.msg
            if (message) {
                alert(message)
            }
        }
    }


    return (
        <div className="login-container flex-col"> {/* Usunięcie kropki z klasy */}
            <h1 className='mb-10'>Witaj ponownie! </h1>

            <div className="login-form sm:max-w-[30vw]">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email ID</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                    <br />
                    <button type="submit">LOGIN</button>
                </form>
                {/* Dodanie linku do zapomnianego hasła */}
                <Link id='forgot-password' to="/reset-forgot-password">Forgot Password?</Link>
                <div className='my-4'>
                    <button onClick={(e) => loginAsUser(e)}>LOGIN AS USER</button>
                    <button className='my-4' onClick={(e) => loginAsAdmin(e)}>LOGIN AS ADMIN</button>
                </div>
            </div>
        </div >
    )
}

export default LoginForm;
