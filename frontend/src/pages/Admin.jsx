import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/AdminPanel.css";
import UserTable from "../components/AdminTable";
import Footer from "../components/Footer";
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState(undefined);
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get("http://localhost:3000/backend/admin/users")
            setUsers(response.data);
            console.log(response);
        };

        getUsers();
    }, []);

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault()
        const searchData = { login, email, name, lastName }
        const response = await axios.post("http://localhost:3000/backend/admin/search-users", searchData)
        if (response.status === 200) {
            setUsers(response.data)
        }
        console.log(response)
    };

    const handleSearchPermissions = () => {
        // Tutaj możesz dodać logikę przekierowania do strony wyszukiwania po uprawnieniach
        // np. window.location.href = "/search-permissions";
    };

    return (
        <div className="w-screen">
            <Navbar />
            <div className="admin-container">
                <h1>Panel Administratora</h1>
                <div className="admin-content">
                    <p>{`Liczba użytkowników: ${users?.length}`}</p>
                </div>
                <div className="admin-actions">
                    <button className='my-6' onClick={() => window.location.href = '/add-user'}>Dodaj użytkownika</button>
                    <button className='my-6' onClick={handleSearchPermissions}>Szukaj po uprawnieniach</button>
                    <h2>Wyszukiwarka</h2>
                    <form onSubmit={handleSearch} className="search-inputs">
                        <input
                            type="text"
                            placeholder="Login"
                            value={login}
                            onChange={handleInputChange(setLogin)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleInputChange(setEmail)}
                        />
                        <input
                            type="text"
                            placeholder="Imię"
                            value={name}
                            onChange={handleInputChange(setName)}
                        />
                        <input
                            type="text"
                            placeholder="Nazwisko"
                            value={lastName}
                            onChange={handleInputChange(setLastName)}
                        />
                        <button type="submit" className="search-button">Wyszukaj</button>
                    </form>
                </div>
                <div className="scrollable-table">
                    <UserTable users={users} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
