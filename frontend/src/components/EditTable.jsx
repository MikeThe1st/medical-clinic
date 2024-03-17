
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
        phoneNumber: "",
        password: ""
    })

    const [previousUserData, setPreviousUserData] = useState({
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
        phoneNumber: "",
        password: ""
    })

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('login')

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`http://localhost:3000/backend/admin/user-data/${query}`)
            setPreviousUserData(response.data)
        }

        getUser()
        console.log(previousUserData)
    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { login: previousLogin } = previousUserData

            const response = await axios.post(`http://localhost:3000/backend/admin/edit-user`, { userData, previousLogin }, { withCredentials: true });
            if (response.status == 201) {
                alert("Changes submitted successfully.")
                window.location.reload()
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const arrayOfLocations = ['city', 'postalCode', 'street', 'propertyNumber', 'apartmentNumber'];
        if (arrayOfLocations.includes(name)) {
            setUserData(prevUserData => ({
                ...prevUserData,
                location: {
                    ...prevUserData.location,
                    [name]: value
                }
            }));
        } else {
            setUserData(prevUserData => ({
                ...prevUserData,
                [name]: value
            }));
        }
    };



    return (
        <div className="EditProfile-container">
            <h1>{`Edit profile: ${query || 'Default User'}`}</h1>
            <form className="EditProfile-form" onSubmit={handleSubmit}>
                <div className="form-column">
                    <div className="form-group">
                        <label>{`Current username: ${previousUserData.login}` || ""}</label>
                        <label htmlFor="login" className="font-bold">Username</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            value={userData.login}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current name: ${previousUserData.name}` || ""}</label>
                        <label htmlFor="name" className="font-bold">First Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current lastName: ${previousUserData.lastName}` || ""}</label>
                        <label htmlFor="lastName" className="font-bold">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current city: ${previousUserData.location.city}` || ""}</label>
                        <label htmlFor="city" className="font-bold">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={userData.location.city}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current city: ${previousUserData.location.postalCode}` || ""}</label>
                        <label htmlFor="postalCode" className="font-bold">Postal Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={userData.location.postalCode}
                            onChange={handleChange}

                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label>{`Current street: ${previousUserData.location.street}` || ""}</label>
                        <label htmlFor="street" className="font-bold">Street</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={userData.location.street}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current property number: ${previousUserData.location.propertyNumber}` || ""}</label>
                        <label htmlFor="propertyNumber" className="font-bold">Property Number</label>
                        <input
                            type="text"
                            id="propertyNumber"
                            name="propertyNumber"
                            value={userData.location.propertyNumber}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current apartment number: ${previousUserData.location.apartmentNumber}` || ""}</label>
                        <label htmlFor="apartmentNumber" className="font-bold">Apartment Number</label>
                        <input
                            type="text"
                            id="apartmentNumber"
                            name="apartmentNumber"
                            value={userData.location.apartmentNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current pesel: ${previousUserData.pesel}` || ""}</label>
                        <label htmlFor="pesel" className="font-bold">PESEL Number</label>
                        <input
                            type="text"
                            id="pesel"
                            name="pesel"
                            value={userData.pesel}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current birth date: ${previousUserData.birthDate}` || ""}</label>
                        <label htmlFor="birthDate" className="font-bold">Birth Date</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={userData.birthDate}
                            onChange={handleChange}

                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label>{`Current email: ${previousUserData.email}` || ""}</label>
                        <label htmlFor="email" className="font-bold">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current phone number: ${previousUserData.phoneNumber}` || ""}</label>
                        <label htmlFor="phoneNumber" className="font-bold">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="form-group">
                        <label>{`Current gender: ${previousUserData.gender}` || ""}</label>
                        <label htmlFor="gender" className="font-bold">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={userData.gender}
                            onChange={handleChange}

                        >
                            <option value="W">Woman</option>
                            <option value="M">Male</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Only change if needed</label>
                        <label htmlFor="password" className="font-bold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}

                        />
                    </div>
                    <br />
                    <div className="edit-button"> <button type="submit">Submit Changes</button></div>

                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
