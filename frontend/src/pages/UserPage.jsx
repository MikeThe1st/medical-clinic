import React, { useState, useEffect } from "react";
import "../css/UserPage.css";

const UserPage = ({ user }) => {
	const [userData, setUserData] = useState({
		firstName: user ? user.name : "Jane",
		lastName: user ? user.lastName : "Smith",
		username: user ? user.login : "janeSmith84",
		age:
			user && user.birthDate
				? calculateAge(user.birthDate)
				: "1992-08-10T00:00:00.000Z",
		photoUrl:
			"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
		location: user ? user.location : "",
		city: user ? user.city : "New York",
		postalCode: user ? user.postalCode : "10001",
		street: user ? user.street : "Broadway",
		propertyNumber: user ? user.propertyNumber : "123",
		apartmentNumber: user ? user.apartmentNumber : "5A",
		pesel: user ? user.pesel : "92081012345",
		email: user ? user.email : "jane.smith84@example.com",
		phoneNumber: user ? user.phoneNumber : "1987654321",
		gender: user ? user.gender : "W",
		reservations: [
			{
			  doctorId: 2,
			  doctorName: "Dr. Maria Nowak",
			  type: "Dermatologist",
			  date: "2024-03-25",
			  time: "11:30 AM",
			},
			{
			  doctorId: 4,
			  doctorName: "Dr. Robert Wiśniewski",
			  type: "Orthopedist",
			  date: "2024-04-05",
			  time: "09:45 AM",
			},
			{
			  doctorId: 6,
			  doctorName: "Dr. Agnieszka Woźniak",
			  type: "Ophthalmologist",
			  date: "2024-04-20",
			  time: "03:15 PM",
			},
			{
			  doctorId: 8,
			  doctorName: "Dr. Paweł Kowalczyk",
			  type: "Pediatrician",
			  date: "2024-05-10",
			  time: "01:00 PM",
			},
			{
			  doctorId: 10,
			  doctorName: "Dr. Marta Łukasik",
			  type: "Gynecologist",
			  date: "2024-05-20",
			  time: "10:30 AM",
			},
			{
				doctorId: 9,
				doctorName: "Dr. Anna Sadowska",
				type: "Endocrinologist",
				date: "2024-04-20",
				time: "01:30 PM",
			  },
			  {
				doctorId: 11,
				doctorName: "Dr. Krzysztof Malinowski",
				type: "Urologist",
				date: "2024-05-10",
				time: "09:00 AM",
			  },
			  {
				doctorId: 5,
				doctorName: "Dr. Michał Zając",
				type: "Psychiatrist",
				date: "2024-04-15",
				time: "03:45 PM",
			  },
			  {
				doctorId: 7,
				doctorName: "Dr. Karolina Piotrowska",
				type: "Dentist",
				date: "2024-05-05",
				time: "11:15 AM",
			  },
			],
			
		  });
	useEffect(() => {
		if (user) {
			setUserData((prevUserData) => ({
				...prevUserData,
				age: user.birthDate ? calculateAge(user.birthDate) : "",
			}));
		}
	}, [user]);

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
		// Funkcja obsługująca edycję profilu
		console.log("Edycja profilu");
	};

	return (
		<div className="user-page">
			<div className="header">
				<h1 className="header-title">Mój pulpit nawigacyjny</h1>
				<div className="user-info">
					{userData.photoUrl && (
						<img className="user-photo" src={userData.photoUrl} alt="User" />
					)}
					<p className="welcome-message">
						Witaj, {userData.firstName} {userData.lastName}!
					</p>
					<p className="user-login">Login: {userData.username}</p>
				</div>
			</div>

			<div className="main-content">
				<div className="sidebar">
					<div className="my-profile">
						<h2 className="profile-title">Mój profil</h2>
						<div className="form-container">
							<form>
								<div className="grid-container">
									<div className="input-container">
										<label>Imię:</label>
										<span>{userData.firstName}</span>
									</div>
									<div className="input-container">
										<label>Nazwisko:</label>
										<span>{userData.lastName}</span>
									</div>
									<div className="input-container">
										<label>Login:</label>
										<span>{userData.username}</span>
									</div>
									<div className="input-container">
										<label>Lokalizacja:</label>
										<span>{userData.location}</span>
									</div>
									<div className="input-container">
										<label>Miasto:</label>
										<span>{userData.city}</span>
									</div>
									<div className="input-container">
										<label>Kod pocztowy:</label>
										<span>{userData.postalCode}</span>
									</div>
									<div className="input-container">
										<label>Ulica:</label>
										<span>{userData.street}</span>
									</div>
									<div className="input-container">
										<label>Numer posesji:</label>
										<span>{userData.propertyNumber}</span>
									</div>
									<div className="input-container">
										<label>Numer mieszkania:</label>
										<span>{userData.apartmentNumber}</span>
									</div>
									<div className="input-container">
										<label>PESEL:</label>
										<span>{userData.pesel}</span>
									</div>
									<div className="input-container">
										<label>Email:</label>
										<span>{userData.email}</span>
									</div>
									<div className="input-container">
										<label>Numer telefonu:</label>
										<span>{userData.phoneNumber}</span>
									</div>
									<div className="input-container">
										<label>Płeć:</label>
										<span>{userData.gender}</span>
									</div>
								</div>
								<div className="input-container">
									<button
										type="button"
										className="edit-profile-button"
										onClick={handleEditProfile}
									>
										Edytuj profil
									</button>
									<button
										type="button"
										className="edit-profile-button"
										onClick={handleEditProfile}
									>
										Zmień hasło 
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="reservations-sidebar">
					<div className="reservations-container">
						<h2 className="reservations-title">Rezerwacje</h2>
						<ul>
							{userData.reservations.map((reservation, index) => (
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
