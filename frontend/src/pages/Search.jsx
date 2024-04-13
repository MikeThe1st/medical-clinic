import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Search.css";

const Search = () => {
  const [funkcjonalnosci, setFunkcjonalnosci] = useState([
    { nazwa: "Zmiana hasła", zaznaczone: false },
    { nazwa: "Edycja użytkownika", zaznaczone: false },
    { nazwa: "Wyświetlenie szczegółowych danych", zaznaczone: false },
    { nazwa: "Nadawanie/usuwanie admina", zaznaczone: false },
    { nazwa: "Nadawanie uprawnień", zaznaczone: false },
    { nazwa: "Umawianie wizyt", zaznaczone: false }
  ]);

  
  const [uzytkownicy, setUzytkownicy] = useState([
    { login: "jan_kowalski", email: "jan@example.com", role: "Użytkownik" },
    { login: "anna_nowak", email: "anna@example.com", role: "Admin" },
    { login: "adam_malysz", email: "adam@example.com", role: "Użytkownik" }
  ]);

  const [wybraneUprawnienia, setWybraneUprawnienia] = useState([]);

  const handleCheckboxChange = (index) => {
    const zaktualizowaneFunkcjonalnosci = [...funkcjonalnosci];
    zaktualizowaneFunkcjonalnosci[index].zaznaczone = !zaktualizowaneFunkcjonalnosci[index].zaznaczone;
    setFunkcjonalnosci(zaktualizowaneFunkcjonalnosci);
  };

  const handleSearch = () => {
    const wybrane = funkcjonalnosci.filter((funkcja) => funkcja.zaznaczone);
    const wybraneNazwy = wybrane.map((funkcja) => funkcja.nazwa);
    setWybraneUprawnienia(wybraneNazwy);
    alert("Wybrane uprawnienia: " + wybraneNazwy.join(", "));
  };

  return (
    <div>
      <Navbar />
      <h1 className="search-header">Szukaj Po Uprawnieniach Użytkownika:</h1>
      <div className="search-container">
        <div className="lista-funkcjonalnosci">
          {funkcjonalnosci.map((funkcja, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={funkcja.zaznaczone}
                onChange={() => handleCheckboxChange(index)}
              />
              {funkcja.nazwa}
            </label>
          ))}
        </div>
      </div>
      <div className="search-button-container">
        <button onClick={handleSearch}>Szukaj</button>
      </div>
      <div className="tabela-uzytkownikow">
        <table>
          <thead>
            <tr>
              <th>Login</th>
              <th>Email</th>
              <th>Rola</th>
              <th>Uprawnienia</th> {/* Dodaj kolumnę dla funkcjonalności */}
            </tr>
          </thead>
          <tbody>
            {uzytkownicy.map((uzytkownik, index) => (
              <tr key={index}>
                <td>{uzytkownik.login}</td>
                <td>{uzytkownik.email}</td>
                <td>{uzytkownik.role}</td>
                <td>
                  <ul>
                    {funkcjonalnosci.map((funkcja, index) => (
                      <li key={index}>{funkcja.nazwa}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
