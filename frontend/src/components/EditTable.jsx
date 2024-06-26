import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/EditPage.css";
import { useLocation } from 'react-router-dom'

const EditProfilePage = () => {
    const [userData, setUserData] = useState({
        login: "",
        name: "",
        lastName: "",
        location: {
            city: "",
            postalCode: "",
            street: "",
            propertyNumber: "",
            apartmentNumber: "",
        },
        pesel: "",
        birthDate: "",
        gender: "",
        email: "",
        phoneNumber: ""
    });
    const [initialData, setInitialData] = useState({});
    const [isActive, setIsActive] = useState(false);

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
    };

    const validatePESEL = (pesel) => {
        if (pesel.length !== 11) {
            return false;
        }

        const controlDigit = parseInt(pesel.charAt(10), 10);
        const calculatedControlDigit = calculatePESELControlDigit(pesel);

        return controlDigit === calculatedControlDigit;
    };

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
        // Postal code validation (xx-xxx format)
        if (userData.postalCode && !/^\d{2}-\d{3}$/.test(userData.postalCode)) {
            alert('Invalid postal code format. Expected format: XX-XXX.');
            return false;
        }

        // Phone number length check
        if (userData.phoneNumber && userData.phoneNumber.length !== 9) {
            alert('Phone number must be 9 digits long.');
            return false;
        }

        // PESEL validation
        if (userData.pesel && !validatePESEL(userData.pesel)) {
            alert('Invalid PESEL.');
            return false;
        }

        // Birth date validation with PESEL
        if (userData.pesel && userData.birthDate && !validateBirthDateWithPESEL(userData.birthDate, userData.pesel)) {
            alert('Birth date does not match the date in PESEL.');
            return false;
        }

        // Gender validation with PESEL
        if (userData.pesel && userData.gender && !validateGenderWithPESEL(userData.gender, userData.pesel)) {
            alert('Gender does not match the gender in PESEL.');
            return false;
        }

        // Check if any changes were made
        if (JSON.stringify(userData) === JSON.stringify(initialData)) {
            alert('No changes made.');
            return false;
        }

        return true;
    };

    const location = useLocation();
    let query = new URLSearchParams(location.search).get('login');
    let isPatient = false;
    if (!query) {
        query = new URLSearchParams(location.search).get('patientId');
        isPatient = true;
    }

    useEffect(() => {
        const getUser = async () => {
            if (!isPatient) {
                const response = await axios.get(`http://localhost:3000/backend/admin/user-data/${query}`);
                setUserData(response.data);
                setInitialData(response.data);
            } else {
                const response = await axios.get(`http://localhost:3000/backend/admin/patient-data/${query}`);
                setUserData(response.data);
                setInitialData(response.data);
            }
        };

        getUser();
    }, []);

    useEffect(() => {
        // Convert MongoDB date to YYYY-MM-DD format for the input field when component mounts or the date changes
        if (userData.birthDate) {
            const formattedDate = new Date(userData.birthDate).toISOString().split('T')[0];
            setUserData((prevData) => ({
                ...prevData,
                birthDate: formattedDate,
            }));
        }
    }, [userData.birthDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const checkData = validateFormData();
        if (!checkData) return;
        try {
            const previousLogin = query;

            if (!isPatient) {
                const response = await axios.post(`http://localhost:3000/backend/admin/edit-user`, { userData, previousLogin }, { withCredentials: true });
                if (response.status === 201) {
                    alert("Changes submitted successfully.");
                    window.location.reload();
                }
            } else {
                const response = await axios.post(`http://localhost:3000/backend/patient/edit`, { userData, query }, { withCredentials: true });
                if (response.status === 201) {
                    alert("Changes submitted successfully.");
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response.data.msg) {
                alert(error.response.data.msg);
                window.location.reload();
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const arrayOfLocations = ['city', 'postalCode', 'street', 'propertyNumber', 'apartmentNumber'];
        if (arrayOfLocations.includes(name)) {
            setUserData((prevUserData) => ({
                ...prevUserData,
                location: {
                    ...prevUserData.location,
                    [name]: value,
                },
            }));
        } else {
            setUserData((prevUserData) => ({
                ...prevUserData,
                [name]: value,
            }));
        }

        // Check if any changes were made and set the activity of the button accordingly
        if (JSON.stringify(userData) !== JSON.stringify(initialData)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };

    return (
        <div className="EditProfile-container">
            <h2>{`Edit profile: ${query || 'Default User'}`}</h2>
            <form className="EditProfile-form" onSubmit={handleSubmit}>
                <div className="form-column">
                    {!isPatient ? (
                        <div className="form-group">
                            <label htmlFor="login" className="font-bold">Username*</label>
                            <input
                                type="text"
                                id="login"
                                name="login"
                                value={userData.login}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="form-group">
                        <label htmlFor="name" className="font-bold">Imie*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="font-bold">Nazwisko*</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" className="font-bold">Miasto*</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={userData.location.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode" className="font-bold">Kod pocztowy*</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={userData.location.postalCode}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{2}-[0-9]{3}"
                            title="Postal code must be in the format XX-XXX"
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="street" className="font-bold">Ulica*</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={userData.location.street}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="propertyNumber" className="font-bold">Numer Posesji*</label>
                        <input
                            type="text"
                            id="propertyNumber"
                            name="propertyNumber"
                            value={userData.location.propertyNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apartmentNumber" className="font-bold">Numer mieszkania</label>
                        <input
                            type="text"
                            id="apartmentNumber"
                            name="apartmentNumber"
                            value={userData.location.apartmentNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pesel" className="font-bold">Numer pesel*</label>
                        <input
                            type="text"
                            id="pesel"
                            name="pesel"
                            value={userData.pesel}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{11}"
                            title="PESEL must contain exactly 11 digits"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthDate" className="font-bold">Data urodzin*</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={userData.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="email" className="font-bold">Adres Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="font-bold">Numer telefonu*</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{9}"
                            title="Phone number must contain exactly 9 digits"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender" className="font-bold">Płeć*</label>
                        <select
                            id="gender"
                            name="gender"
                            value={userData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="W">Kobieta</option>
                            <option value="M">Mężczyzna</option>
                        </select>
                    </div>
                </div>
               
                  <div>
                    <button onClick={() => { window.location.href = '/list-of-patients' }}>Powrót </button>
                </div>
                <div className="edit-button">
                    <button type="submit" disabled={!isActive}>Zapisz</button>
                    
                  </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
