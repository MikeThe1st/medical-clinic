import React, { useState } from "react";
import "../css/UserPage.css";

const UserPage = () => {
	const [activeAccount, setActiveAccount] = useState("Account1"); // Domyślne aktywne konto
	const [userData, setUserData] = useState({
		firstName: "sdf",
		lastName: "asd",
		username: "asdas",
		age: "", // Dodane pole na wiek użytkownika
		photoUrl:
			"https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png", // Dodane pole na adres URL zdjęcia
	});

	const handleAccountChange = (e) => {
		setActiveAccount(e.target.value);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	return (
		<div className="user-page">
			<div className="header">
				<h1 className="header-title">Mój pulpit nawigacyjny</h1>
				<div className="user-info">
					{/* Zdjęcie użytkownika */}
					{userData.photoUrl && (
						<img className="user-photo" src={userData.photoUrl} alt="User" />
					)}
					<p className="welcome-message">
						Witaj, {userData.firstName} {userData.lastName}!
					</p>
					<p className="user-login">Login: {userData.username}</p>
					
				</div>

				<div className="sidebar">
					<div className="my-profile">
						<h2 className="profile-title">Mój profil</h2>
						<div className="form-container">
							<form>
								<div className="input-container">
									<label>Imię:</label>
									<input
										className="input-field"
										type="text"
										name="firstName"
										value={userData.firstName}
										onChange={handleInputChange}
									/>
								</div>
								<div className="input-container">
									<label>Nazwisko:</label>
									<input
										className="input-field"
										type="text"
										name="lastName"
										value={userData.lastName}
										onChange={handleInputChange}
									/>
								</div>
								<div className="input-container">
									<label>Login:</label>
									<input
										className="input-field"
										type="text"
										name="username"
										value={userData.username}
										onChange={handleInputChange}
									/>
								</div>
								<div className="input-container">
									<label>Dodatkowe informacje:</label>
									<input
										className="input-field"
										type="text"
										name="age"
										value={userData.age}
										onChange={handleInputChange}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPage;
