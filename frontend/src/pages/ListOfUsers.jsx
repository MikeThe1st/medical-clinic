import React, { useState, useEffect } from "react";

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

    // Efekt pobierania danych z bazy danych (symulacja)
    useEffect(() => {
        // Symulacja pobierania danych z bazy danych
        const fetchData = async () => {
            // Tutaj mogłaby być rzeczywista integracja z bazą danych, np. za pomocą fetch lub biblioteki do zarządzania stanem
            // Dla przykładu, tutaj jest symulowane pobieranie danych
            const data = [
                {
                    id: 1,
                    firstName: "Jan",
                    lastName: "Kowalski",
                    pesel: "12345678901",
                    city: "Warszawa",
                    street: "ul. Kwiatowa 5",
                    phoneNumber: "123-456-789"
                },
                {
                    id: 2,
                    firstName: "Anna",
                    lastName: "Nowak",
                    pesel: "98765432109",
                    city: "Kraków",
                    street: "ul. Leśna 10",
                    phoneNumber: "987-654-321"
                },
                // Tutaj mogą być inne dane użytkowników z bazy danych
            ];

            // Ustawienie pobranych danych do stanu
            setUsers(data);
        };

        // Wywołanie funkcji pobierania danych
        fetchData();
    }, []);

    // Funkcja do filtrowania użytkowników na podstawie wprowadzonych wartości w polach wyszukiwania
    const filteredUsers = users.filter(user => {
        return (
            user.firstName.toLowerCase().includes(searchFirstName.toLowerCase()) &&
            user.lastName.toLowerCase().includes(searchLastName.toLowerCase()) &&
            user.pesel.includes(searchPesel) &&
            user.city.toLowerCase().includes(searchCity.toLowerCase()) &&
            user.street.toLowerCase().includes(searchStreet.toLowerCase()) &&
            user.phoneNumber.includes(searchPhoneNumber)
        );
    });

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
                <button onClick={() => {}}>Wyszukaj</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Pesel</th>
                        <th>Miasto</th>
                        <th>Ulica</th>
                        <th>Numer telefonu</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.pesel}</td>
                            <td>{user.city}</td>
                            <td>{user.street}</td>
                            <td>{user.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </div>
    );
};

export default ListOfUsers;
