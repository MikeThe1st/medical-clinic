import React from "react";
import Navbar from "../components/Navbar";
import  "../css/AdminPanel.css";
import UserTable from "../components/AdminTable";
const Admin = () => {
	const usersArray = [
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
		{
			id: 2,
			login: "jane_smith_login",
			firstName: "Jane",
			lastName: "Smith",
			address: {
				city: "Los Angeles",
				zipCode: "90001",
				street: "Hollywood Blvd",
				houseNumber: "456",
				apartmentNumber: "78",
			},
			pesel: "98765432109",
			birthDate: "1985-08-22",
			gender: "Female",
			email: "jane.smith@example.com",
			phoneNumber: "987-654-321",
		},
	];

	return (
		<div className="admin-container">
			<h1>Panel Administratora</h1>

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
			<UserTable users={usersArray} />
		</div>
	);
};

export default Admin;
