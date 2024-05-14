import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/SearchBox.css"; // Importujemy plik CSS dla wyszukiwarki
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ListOfUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchFirstName, setSearchFirstName] = useState("");
    const [searchLastName, setSearchLastName] = useState("");
    const [searchPesel, setSearchPesel] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [searchStreet, setSearchStreet] = useState("");
    const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
    const [searchEmail, setSearchEmail] = useState("");

    const fetchData = async () => {
        event.preventDefault()
        const searchData = { searchFirstName, searchLastName, searchPesel, searchCity, searchStreet, searchPhoneNumber, searchEmail }
        const response = await axios.post("http://localhost:3000/backend/patient/search", searchData)
        if (response.status === 200) {
            setUsers(response.data)
        }
        else {
            setUsers([])
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="search-container">
                <label htmlFor="firstName">Imię:</label>
                <input
                    type="text"
                    id="firstName"
                    value={searchFirstName}
                    onChange={e => setSearchFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Nazwisko:</label>
                <input
                    type="text"
                    id="lastName"
                    value={searchLastName}
                    onChange={e => setSearchLastName(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={searchEmail}
                    onChange={e => setSearchEmail(e.target.value)}
                />
                <label htmlFor="pesel">Pesel:</label>
                <input
                    type="text"
                    id="pesel"
                    value={searchPesel}
                    onChange={e => setSearchPesel(e.target.value)}
                />
                <label htmlFor="city">Miasto:</label>
                <input
                    type="text"
                    id="city"
                    value={searchCity}
                    onChange={e => setSearchCity(e.target.value)}
                />
                <label htmlFor="street">Ulica:</label>
                <input
                    type="text"
                    id="street"
                    value={searchStreet}
                    onChange={e => setSearchStreet(e.target.value)}
                />
                <label htmlFor="phoneNumber">Numer telefonu:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={searchPhoneNumber}
                    onChange={e => setSearchPhoneNumber(e.target.value)}
                />
                <button onClick={() => { event.preventDefault(); fetchData() }}>Wyszukaj</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Email</th>
                        <th>Pesel</th>
                        <th>Miasto</th>
                        <th>Ulica</th>
                        <th>Numer telefonu</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.pesel}</td>
                            <td>{user.location.city}</td>
                            <td>{user.location.street}</td>
                            <td>{user.phoneNumber}</td>
                            <button onClick={() => { window.location.href = `/edit-page?patientId=${user._id}` }}>Edytuj</button>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </div>
    );
};

export default ListOfUsers;
