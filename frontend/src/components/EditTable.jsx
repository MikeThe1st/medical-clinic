// EditProfilePage.jsx
import React, { useState } from "react";
import axios from "axios";
import "../css/EditPage.css";

const EditProfilePage = () => {
    const [userData, setUserData] = useState({
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
        gender: "",
        email: "",
        phoneNumber: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const newUser = {};
            formData.forEach((value, key) => {
                newUser[key] = value;
            });

            await axios.post("http://localhost:3000/backend/user/login", newUser, { withCredentials: true });
            console.log("Changes submitted successfully.");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    return (
        <div className="EditProfile-container">
            <h1>Edit Profile</h1>
            <form className="EditProfile-form" onSubmit={handleSubmit}>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="login">Username</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            value={userData.login}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
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
                        <label htmlFor="lastName">Last Name</label>
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
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={userData.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="form-group">
                        <label htmlFor="street">Street</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={userData.street}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="propertyNumber">Property Number</label>
                        <input
                            type="text"
                            id="propertyNumber"
                            name="propertyNumber"
                            value={userData.propertyNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apartmentNumber">Apartment Number</label>
                        <input
                            type="text"
                            id="apartmentNumber"
                            name="apartmentNumber"
                            value={userData.apartmentNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pesel">PESEL Number</label>
                        <input
                            type="text"
                            id="pesel"
                            name="pesel"
                            value={userData.pesel}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthDate">Birth Date</label>
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
                        <label htmlFor="email">Email Address</label>
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
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={userData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="W">Woman</option>
                            <option value="M">Male</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            required
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
