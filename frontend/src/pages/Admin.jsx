import React from "react";
import Navbar from "../components/Navbar";
const Admin = () => {
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
		  <button>Dodaj nowego użytkownika</button>
		  <button>Przeglądaj zamówienia</button>
		</div>
	  </div>
	);
};

export default Admin;
