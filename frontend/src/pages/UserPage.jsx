import React, { useState, useEffect } from "react";
import "../css/UserPage.css";
import { useLocation } from "react-router-dom";
import axios from 'axios'; // Import axios

const UserPage = () => {
	const [userData, setUserData] = useState(undefined);

	const location = useLocation();
	const query = new URLSearchParams(location.search).get('login');

	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/backend/admin/user-data/${query}`);
				setUserData(response.data)
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}

		getUser();
	}, [query]); // Add query to dependency array

	const calculateAge = (birthDate) => {
		const today = new Date();
		const dob = new Date(birthDate);
		let age = today.getFullYear() - dob.getFullYear();
		const monthDiff = today.getMonth() - dob.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
			age--;
		}
		return age;
	};

	const handleEditProfile = () => {
		console.log("Edycja profilu");
	};

	return (
		<div className="user-page">
			{/* Header and user info */}
			<div className="header">
				<h1 className="header-title">Mój pulpit nawigacyjny</h1>
				<div className="user-info">
					<img className="user-photo" src={"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="User" />
					<p className="welcome-message">
						{userData && `Witaj, ${userData.name} ${userData.lastName}!`}
					</p>
					<p className="user-login">{userData && `Login: ${userData.login}`}</p>
				</div>
			</div>

			{/* Main content */}
			<div className="main-content">
				<div className="sidebar">
					<div className="my-profile">
						<h2 className="profile-title">Mój profil</h2>
						<div className="form-container">
							<form>

								<div className="grid-container">
									<div className="input-container">
										<label>Name:</label>
										<span>{userData && userData.name}</span>
									</div>
									<div className="input-container">
										<label>Last name:</label>
										<span>{userData && userData.lastName}</span>
									</div>
									<div className="input-container">
										<label>Login:</label>
										<span>{userData && userData.login}</span>
									</div>
									{/* Populate user data */}
									{userData && Object.entries(userData.location).map(([key, value]) => (
										<div className="input-container" key={key}>
											<label>{key}:</label>
											<span>{value}</span>
										</div>
									))}
									<div className="input-container">
										<label>PESEL:</label>
										<span>{userData && userData.pesel}</span>
									</div>
									<div className="input-container">
										<label>Email:</label>
										<span>{userData && userData.email}</span>
									</div>
									<div className="input-container">
										<label>Numer telefonu:</label>
										<span>{userData && userData.phoneNumber}</span>
									</div>
									<div className="input-container">
										<label>Płeć:</label>
										<span>{userData && userData.gender}</span>
									</div>
								</div>
								<div className="input-container">
									<button
										type="button"
										className="edit-profile-button"
										onClick={(e) => { e.preventDefault(); window.location.href = `/edit-page?login=${userData.login}` }}
									>
										Edytuj profil
									</button>
									<button
										type="button"
										className="edit-profile-button"
										onClick={(e) => { e.preventDefault(); window.location.href = `/change-password?login=${userData.login}` }}
									>
										Zmień hasło
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* Reservations sidebar */}
				<div className="reservations-sidebar">
					<div className="reservations-container">
						<h2 className="reservations-title">Rezerwacje</h2>
						<ul>
							{userData && userData.reservations && userData.reservations.map((reservation, index) => (
								<li key={index} className="reservation-item">
									<p>Doctor ID: {reservation.doctorId}</p>
									<p>Doctor Name: {reservation.doctorName}</p>
									<p>Type: {reservation.type}</p>
									<p>Date: {reservation.date}</p>
									<p>Time: {reservation.time}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPage;
