import React, { useState, useEffect } from 'react'
import Navbar from "../components/Navbar";
import "../css/AdminPanel.css";
import UserTable from "../components/AdminTable";
import Footer from "../components/Footer";
import axios from "axios";

const Admin = () => {

	const [users, setUsers] = useState(undefined)

	useEffect(() => {
		const getUsers = async () => {
			const response = await axios.get('http://localhost:3000/backend/admin/users')
			setUsers(response.data)
			console.log(response)
		}

		getUsers()
	}, [])


	return (
		<div>
			<Footer/>
			<Navbar />
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
				<UserTable users={users} />
			</div>
		</div>
	);
};

export default Admin;
