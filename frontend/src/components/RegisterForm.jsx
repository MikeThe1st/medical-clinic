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

    const validateEmail = (email) => {
        const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const validatePESEL = (pesel) => {
        const peselRegex = /^[0-9]{11}$/;
        if (!peselRegex.test(pesel)) return false;

        let year = parseInt(pesel.substring(0, 2));
        const month = parseInt(pesel.substring(2, 4));
        const day = parseInt(pesel.substring(4, 6));

        if (month > 80 && month < 93) {
            year += 1800;
        } else if (month > 0 && month < 13) {
            year += 1900;
        } else if (month > 20 && month < 33) {
            year += 2000;
        } else if (month > 40 && month < 53) {
            year += 2100;
        } else if (month > 60 && month < 73) {
            year += 2200;
        }

        const birthDate = new Date(year, month - 1, day);
        if (
            birthDate.getDate() !== day ||
            birthDate.getMonth() !== month - 1 ||
            birthDate.getFullYear() !== year
        ) {
            return false;
        }

        const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;

        for (let i = 0; i < 10; i++) {
            sum += parseInt(pesel.charAt(i)) * weights[i];
        }

        sum = (10 - (sum % 10)) % 10;

        if (sum !== parseInt(pesel.charAt(10))) {
            return false;
        }

        // Określenie płci na podstawie ostatniej cyfry PESEL
        const genderDigit = parseInt(pesel.charAt(9));
        const gender = genderDigit % 2 === 0 ? "W" : "M"; // "W" - kobieta, "M" - mężczyzna

        setFormData({
            ...formData,
            gender: gender,
        });

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.login) errors.login = "Login is required";
        if (!formData.name) errors.name = "Name is required";
        if (!formData.lastName) errors.lastName = "Last name is required";
        if (!formData.city) errors.city = "City is required";
        if (!formData.postalCode) errors.postalCode = "Postal code is required";
        if (!formData.propertyNumber) errors.propertyNumber = "Property number is required";
        if (!formData.pesel) errors.pesel = "PESEL is required";
        else if (!validatePESEL(formData.pesel)) errors.pesel = "Invalid PESEL number";
        if (!formData.birthDate) errors.birthDate = "Birth date is required";
        if (!formData.email) errors.email = "Email is required";
        else if (!validateEmail(formData.email)) errors.email = "Invalid email format";
        if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
        else if (!/^[0-9]{9}$/.test(formData.phoneNumber)) errors.phoneNumber = "Invalid phone number format";
        if (!formData.password) errors.password = "Password is required";

        if (Object.keys(errors).length === 0) {
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
        } else {
            setErrors(errors);
        }
    };

	return (
		<div className="Registration-container max-w-[800px] mx-auto">
			<h1 className="m-10">Dodaj użytkownika</h1>

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
						value={formData.login}
						onChange={handleChange}
						required
					/>
					{errors.login && <p className="error">{errors.login}</p>}
					<br />
					<label htmlFor="name">Imię</label>
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
					{errors.name && <p className="error">{errors.name}</p>}
					<br />
					<label htmlFor="lastName">Nazwisko</label>
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
					{errors.lastName && <p className="error">{errors.lastName}</p>}
					<br />
					<label htmlFor="city">Miejscowość</label>
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
					{errors.city && <p className="error">{errors.city}</p>}
					<br />
					<label htmlFor="postalCode">Kod pocztowy</label>
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
					{errors.postalCode && <p className="error">{errors.postalCode}</p>}
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
					<label htmlFor="propertyNumber">Numer posesji</label>
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
					<label htmlFor="pesel">Numer PESEL</label>
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
					{errors.pesel && <p className="error">{errors.pesel}</p>}
					<br />
					<label htmlFor="birthDate">Data urodzenia</label>
					<br />
					<input
						type="date"
						id="birthDate"
						name="birthDate"
						value={formData.birthDate}
						onChange={handleChange}
						required
					/>
					{errors.birthDate && <p className="error">{errors.birthDate}</p>}
					<br />
					<label htmlFor="gender">Płeć</label>
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
					<label htmlFor="email">Adres e-mail</label>
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
					{errors.email && <p className="error">{errors.email}</p>}
					<br />
					<label htmlFor="phoneNumber">Numer telefonu</label>
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
					{errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
					<br />
					<label htmlFor="password">Hasło</label>
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
					{errors.password && <p className="error">{errors.password}</p>}
					<div className="Registration-button-container">
						<button type="submit">Zarejestruj się</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
