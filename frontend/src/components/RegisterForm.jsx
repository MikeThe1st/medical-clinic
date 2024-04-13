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
	const [notification, setNotification] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

<<<<<<< HEAD
	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		return emailRegex.test(email) && email.length <= 255;
	};

    const validatePesel = (pesel, gender) => {
        const peselRegExp = /^[0-9]{11}$/;
        
        if (!peselRegExp.test(pesel)) {
            return "Nieprawidłowy format numeru PESEL";
        }
    
        let year = parseInt(pesel.substring(0, 2));
        let month = parseInt(pesel.substring(2, 4)) - 1;
        let day = parseInt(pesel.substring(4, 6));
    
        if (month > 80) {
            year += 1800;
            month -= 80;
        } else if (month > 60) {
            year += 2200;
            month -= 60;
        } else if (month > 40) {
            year += 2100;
            month -= 40;
        } else if (month > 20) {
            year += 2000;
            month -= 20;
        } else {
            year += 1900;
        }
    
        let birthDate = new Date(year, month, day);
    
        if (
            birthDate.getFullYear() !== year ||
            birthDate.getMonth() !== month ||
            birthDate.getDate() !== day
        ) {
            return "Nieprawidłowa data urodzenia w numerze PESEL";
        }
    
        let weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;
    
        for (let i = 0; i < 10; i++) {
            sum += parseInt(pesel[i]) * weights[i];
        }
    
        let checkSum = (10 - (sum % 10)) % 10;
    
        if (checkSum !== parseInt(pesel[10])) {
            return "Nieprawidłowa suma kontrolna w numerze PESEL";
        }
    
        let genderFromPesel = parseInt(pesel[9]) % 2 === 0 ? "K" : "M";
    
        if (genderFromPesel !== gender) {
            return "Nieprawidłowa płeć w numerze PESEL";
        }
    
        return "";
    }
    
    
    
=======
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
            console.log(error)
            if (error.response.data.msg) {
                alert(error.response.data.msg)
            }
        }

    };
>>>>>>> c5639e722182ab5c769afafd1c658396b67ad75d

	const handleSubmit = async (e) => {
		e.preventDefault();

<<<<<<< HEAD
		const errors = {};

		if (!formData.login) errors.login = "Login is required";
		if (!formData.name) errors.name = "Name is required";
		if (!formData.lastName) errors.lastName = "Last name is required";
		if (!formData.city) errors.city = "City is required";
		if (!formData.postalCode) errors.postalCode = "Postal code is required";
		if (!formData.propertyNumber)
			errors.propertyNumber = "Property number is required";
		if (!formData.pesel) errors.pesel = "PESEL is required";
		else {
			const peselError = validatePesel(formData.pesel, formData.gender);
			if (peselError) errors.pesel = peselError;
		}
		if (!formData.birthDate) errors.birthDate = "Birth date is required";
		if (!formData.email) errors.email = "Email is required";
		else if (!validateEmail(formData.email))
			errors.email = "Invalid email format";
		if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
		else if (!/^[0-9]{9}$/.test(formData.phoneNumber))
			errors.phoneNumber = "Invalid phone number format";
		if (!formData.password) errors.password = "Password is required";

		if (Object.keys(errors).length === 0) {
			try {
				const response = await axios.post(
					"http://localhost:3000/backend/user/register",
					formData
				);
				console.log(response.data);
				setNotification("Konto zostało utworzone. Możesz się zalogować.");
				setFormData({
					login: "",
					name: "",
					lastName: "",
					city: "",
					postalCode: "",
					street: "",
					propertyNumber: "",
					apartmentNumber: "",
					pesel: "",
					birtDate: "",
					gender: "W",
					email: "",
					phoneNumber: "",
					password: "",
				});
			} catch (error) {
				if (error.response) {
					// Błąd odpowiedzi z serwera
					console.error("Error data:", error.response.data);
					console.error("Error status:", error.response.status);
					console.error("Error headers:", error.response.headers);
					setNotification(
						`Wystąpił błąd podczas rejestracji: ${error.response.data.message}`
					);
				} else if (error.request) {
					// Brak odpowiedzi z serwera
					console.error("No response received:", error.request);
					setNotification("Brak odpowiedzi z serwera.");
				} else {
					// Inne błędy
					console.error("Error message:", error.message);
					setNotification("Wystąpił niespodziewany błąd.");
				}
			}
		} else {
			setErrors(errors);
		}
	};

	return (
		<div className="Registration-container max-w-[800px] mx-auto">
			<h1 className="m-10">Dodaj użytkownika</h1>

			{notification && <p className="notification">{notification}</p>}

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
					{errors.propertyNumber && (
						<p className="error">{errors.propertyNumber}</p>
					)}
					<br />
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
						type="text"
						id="email"
						name="email"
						placeholder="Enter your email"
						value={formData.email}
						onChange={handleChange}
						required
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
=======
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
                            <label htmlFor="street">Ulica*</label>
                            <br />
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Enter your street"
                                value={formData.street}
                                onChange={handleChange}
                                required
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
>>>>>>> c5639e722182ab5c769afafd1c658396b67ad75d
};

export default RegisterForm;
