import React from 'react'
import "../css/Registration.css";
import axios from 'axios'

const RegisterForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Fetch form data
        const formData = new FormData(e.target)

        // Convert form data to JSON object
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value
        })

        console.log("Form Data:", userData)

        await axios.post('http://localhost:3000/backend/user/register', userData)
            .then(response => {
                console.log(response.data)
                alert('Konto zostało utworzone. Możesz się zalogować.')
                window.href = '/login'
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <div className="Registration-container max-w-[800px] mx-auto">
            <h1 className='m-10'>Dodaj użytkownika</h1>

            <form className="Registration-form" onSubmit={handleSubmit}>
                <div className="Registration-column">
                    {/* Pierwsza kolumna */}
                    <label htmlFor="login">Login</label>
                    <br />
                    <input
                        type="text"
                        id="login"
                        name="login"
                        placeholder="Enter your username"
                        required
                    />
                    <br />
                    <label htmlFor="name">Imię</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        required
                    />
                    <br />
                    <label htmlFor="lastName">Nazwisko</label>
                    <br />
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        required
                    />
                    <br />
                    <label htmlFor="city">Miejscowość</label>
                    <br />
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter your city"
                        required
                    />
                    <br />
                    <label htmlFor="postalCode">Kod pocztowy</label>
                    <br />
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        placeholder="Enter your postal code"
                        required
                    />
                    <br />
                    <label htmlFor="street">Ulica</label>
                    <br />
                    <input
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Enter your street"
                    />
                    <br />
                    <label htmlFor="propertyNumber">Numer posesji</label>
                    <br />
                    <input
                        type="text"
                        id="propertyNumber"
                        name="propertyNumber"
                        placeholder="Enter your property number"
                        required
                    />
                </div>

                <div className="Registration-column">
                    {/* Druga kolumna */}

                    <label htmlFor="apartmentNumber">Numer lokalu</label>
                    <br />
                    <input
                        type="text"
                        id="apartmentNumber"
                        name="apartmentNumber"
                        placeholder="Enter your apartment number"
                    />
                    <br />
                    <label htmlFor="pesel">Numer PESEL</label>
                    <br />
                    <input
                        type="text"
                        id="pesel"
                        name="pesel"
                        placeholder="Enter your PESEL number"
                        required
                    />
                    <br />
                    <label htmlFor="birthDate">Data urodzenia</label>
                    <br />
                    <input type="date" id="birthDate" name="birthDate" required />
                    <br />
                    <label htmlFor="gender">Gender (Woman/Male)</label>
                    <br />
                    <select id="gender" name="gender" required>
                        <option value="W">Woman</option>
                        <option value="M">Male</option>
                    </select>
                    <br />
                    <label htmlFor="email">Adres e-mail</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                    <br />
                    <label htmlFor="phoneNumber">Numer telefonu</label>
                    <br />
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        required
                    />
                    <br />
                    <label htmlFor="password">Hasło</label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                    />
                    <div className="Registration-button-container">
                        <button type="submit">Zarejestruj się</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm