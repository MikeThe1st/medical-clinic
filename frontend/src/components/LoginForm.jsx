import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Załóżmy, że używamy React Router

import "../css/Login.css";

const LoginForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        // Convert form data to JSON object
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value
        })

        try {
            const response = await axios.post('http://localhost:3000/backend/user/login', userData, { withCredentials: true })
            console.log('Response:', response.data)
            if (response.status === 200) window.location.href = '/'
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const loginAsUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/backend/user/login', { email: 'user@gmail.com', password: 'user123' }, { withCredentials: true })
            if (response.status === 200) window.location.href = '/'
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const loginAsAdmin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/backend/user/login', { email: 'admin@gmail.com', password: 'admin123' }, { withCredentials: true })
            if (response.status === 200) window.location.href = '/'
        } catch (error) {
            console.error('Error:', error);
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
