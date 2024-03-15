import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/AdminPanel.css";
import UserTable from "../components/AdminTable";
import Footer from "../components/Footer";
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState(undefined);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get(
                "http://localhost:3000/backend/admin/users"
            );
            setUsers(response.data);
            console.log(response);
        };

        getUsers();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        // Implementuj logikę wyszukiwania
        console.log("Wyszukaj: ", searchQuery);
    };

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
                    <h2>Administrator</h2>
                    <br />
                    <h2>Wyszukiwarka</h2>
                    <div className="search-inputs">
                        <div className="search-input">
                            <input
                                type="text"
                                id="searchInput1"
                                placeholder="Login"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="search-input">
                            <input
                                type="text"
                                id="searchInput2"
                                placeholder="Imię"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="search-input">
                            <input
                                type="text"
                                id="searchInput3"
                                placeholder="Nazwisko"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
						<div className="search-input">
                            <input
                                type="text"
                                id="searchInput4"
                                placeholder="Email"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <button className="search-button" onClick={handleSearch}>
                            Wyszukaj
                        </button>
                    </div>
                    <button id="admin-actions">Dodaj użytkownika</button>
                </div>
                <div className="scrollable-table">
                    <UserTable users={users} />
                </div>
            </div>
        </div>
    );
};

export default Admin;
