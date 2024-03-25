import React, { useState } from "react";
import "../css/Registration.css";
import axios from "axios";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        login: "",
        name: "",
        lastName: "",
        city: "",
        postalCode: "",
        street: "",
        propertyNumber: "",
        apartmentNumber: "",
        pesel: "",
        birthDate: "",
        gender: "W",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const validateEmail = (email) => {
    //     const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    //     return emailRegex.test(email);
    // };

    const calculatePESELControlDigit = (pesel) => {
        const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;

        for (let i = 0; i < 10; i++) {
            sum += (parseInt(pesel.charAt(i), 10) * weights[i]) % 10;
        }

        sum %= 10;
        if (sum !== 0) {
            sum = 10 - sum;
        }

        return sum;
    }

    const validatePESEL = (pesel) => {
        if (pesel.length !== 11) {
            return false;
        }

        const controlDigit = parseInt(pesel.charAt(10), 10);
        const calculatedControlDigit = calculatePESELControlDigit(pesel);

        return controlDigit === calculatedControlDigit;
    }
    function validateBirthDateWithPESEL(birthDate, pesel) {
        // Extracting birth date from PESEL
        const year = parseInt(pesel.substring(0, 2), 10) + (parseInt(pesel.substring(2, 3), 10) >= 2 ? 2000 : 1900);
        const month = parseInt(pesel.substring(2, 4), 10) % 20; // Handle months for different centuries
        const day = parseInt(pesel.substring(4, 6), 10);

        // Formatting birthDate to match the format extracted from PESEL
        const formattedBirthDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        return birthDate === formattedBirthDate;
    }

    function validateGenderWithPESEL(gender, pesel) {
        const genderDigit = parseInt(pesel[9], 10);
        const isMale = genderDigit % 2 === 1;
        return (gender === 'M' && isMale) || (gender === 'W' && !isMale);
    }

    const validateFormData = () => {
        // Simple presence check for required fields
        const requiredFields = ['login', 'name', 'lastName', 'city', 'postalCode', 'street', 'propertyNumber', 'apartmentNumber', 'email', 'password'];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                alert(`Please provide ${field}, it is required.`)
                return false
            }
        });

        // Postal code validation (xx-xxx format)
        if (formData.postalCode && !/^\d{2}-\d{3}$/.test(formData.postalCode)) {
            alert('Invalid postal code format. Expected format: XX-XXX.')
            return false
        }

        // Phone number length check
        if (formData.phoneNumber && formData.phoneNumber.length !== 9) {
            alert('Phone number must be 9 digits long.')
            return false
        }

        // PESEL validation
        if (formData.pesel && !validatePESEL(formData.pesel)) {
            alert('Invalid PESEL.')
            return false
        }

        // Birth date validation with PESEL
        if (formData.pesel && formData.birthDate && !validateBirthDateWithPESEL(formData.birthDate, formData.pesel)) {
            alert('Birth date does not match the date in PESEL.')
            return false
        }

        // Gender validation with PESEL
        if (formData.pesel && formData.gender && !validateGenderWithPESEL(formData.gender, formData.pesel)) {
            alert('Gender does not match the gender in PESEL.');
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateFormData() == false) return
        try {
            const response = await axios.post(
                "http://localhost:3000/backend/user/register",
                formData
            );
            console.log(response.data);
            alert("Konto zostało utworzone. Możesz się zalogować.");
            window.location.href = "/login";
        } catch (error) {
            alert(error);
        }

    };

    return (
        <div className="Registration-container max-w-[800px] mx-auto">
            <h1 className="m-10">Dodaj użytkownika</h1>

            <form className="Registration-form" onSubmit={handleSubmit}>
                <div className="mx-auto">
                    <div className="flex flex-row">
                        <div className="Registration-column">
                            {/* Pierwsza kolumna */}
                            <label htmlFor="login">Login*</label>
                            <br />
                            <input
                                type="text"
                                id="login"
                                name="login"
                                placeholder="Enter your username"
                                value={formData.login}
                                onChange={handleChange}
                                required
                            />
                            <br />
                            <label htmlFor="name">Imię*</label>
                            <br />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <br />
                            <label htmlFor="lastName">Nazwisko*</label>
                            <br />
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            <br />
                            <label htmlFor="city">Miejscowoś*</label>
                            <br />
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Enter your city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                            <br />
                            <label htmlFor="postalCode">Kod pocztowy*</label>
                            <br />
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                placeholder="Enter your postal code"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{2}-[0-9]{3}"
                                title="Postal code must be in the format XX-XXX"
                            />
                            <br />
                            <label htmlFor="street">Ulica</label>
                            <br />
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Enter your street"
                                value={formData.street}
                                onChange={handleChange}
                            />
                            <br />
                            <label htmlFor="propertyNumber">Numer posesji*</label>
                            <br />
                            <input
                                type="text"
                                id="propertyNumber"
                                name="propertyNumber"
                                placeholder="Enter your property number"
                                value={formData.propertyNumber}
                                onChange={handleChange}
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
                                value={formData.apartmentNumber}
                                onChange={handleChange}
                            />
                            <br />
                            <label htmlFor="pesel">Numer PESEL*</label>
                            <br />
                            <input
                                type="text"
                                id="pesel"
                                name="pesel"
                                placeholder="Enter your PESEL number"
                                value={formData.pesel}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{11}"
                                title="PESEL must contain exactly 11 digits"
                            />
                            <br />
                            <label htmlFor="birthDate">Data urodzenia*</label>
                            <br />
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                required
                            />
                            <br />
                            <label htmlFor="gender">Płeć*</label>
                            <br />
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="W">Kobieta</option>
                                <option value="M">Mężczyzna</option>
                            </select>
                            <br />
                            <label htmlFor="email">Adres e-mail*</label>
                            <br />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                maxLength="255"
                            />
                            <br />
                            <label htmlFor="phoneNumber">Numer telefonu*</label>
                            <br />
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{9}"
                                title="Phone number must contain exactly 9 digits"
                            />
                            <br />
                            <label htmlFor="password">Hasło*</label>
                            <br />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="Registration-button-container mx-32">
                        <button type="submit" className="">Zarejestruj się</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
