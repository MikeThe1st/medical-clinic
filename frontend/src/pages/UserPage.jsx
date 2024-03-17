import React from "react";
import Navbar from "../components/Navbar";
import "../css/AdminPanel.css";
import UserTable from "../components/ProfileTable";
const UserPage = () => {
	const userArray = [
		{
			id: 1,
			login: "john_doe_login",
			firstName: "John",
			lastName: "Doe",
			address: {
				city: "New York",
				zipCode: "10001",
				street: "Broadway",
				houseNumber: "123",
				apartmentNumber: "45",
			},
			pesel: "12345678901",
			birthDate: "1990-01-15",
			gender: "Male",
			email: "john.doe@example.com",
			phoneNumber: "123-456-789",
		},
	];

	return (
		<div className="w-screen">
			<Navbar />

			<div className="admin-container">
				<h1>Panel Użytkownika</h1>

				<div className="admin-content">
					<h2>Statystyki</h2>
					<p>Liczba użytkowników: 100</p>
					<p>Liczba zamówień: 50</p>
				</div>

				<div className="admin-actions">
					<h2>Akcje Administratora</h2>
					<button>Dodaj  użytkownika</button><br />
					<button>usuń  użytkownika</button>
				</div>
				<UserTable user={userArray} />
			</div>
		</div>
	);
};

export default UserPage;
