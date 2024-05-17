import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Search.css";
import axios from "axios";

const Search = () => {
  const [funkcjonalnosci, setFunkcjonalnosci] = useState([
    { nazwa: "Zmiana hasła", zaznaczone: false },
    { nazwa: "Edycja użytkownika", zaznaczone: false },
    { nazwa: "Wyświetlenie szczegółowych danych", zaznaczone: false },
    { nazwa: "Nadawanie/usuwanie admina", zaznaczone: false },
    { nazwa: "Nadawanie uprawnień", zaznaczone: false },
    { nazwa: "Umawianie wizyt", zaznaczone: false },
    { nazwa: "Dodawanie użytkowników", zaznaczone: false },
    { nazwa: "Wyszukiwanie po uprawnieniach", zaznaczone: false },
    { nazwa: "Przeglądanie lekarzy", zaznaczone: false },
    { nazwa: "Dodawanie pacjentów", zaznaczone: false },
    { nazwa: "Przeglądanie pacjentów", zaznaczone: false },
    { nazwa: "Przeglądanie wszystkich wizyt", zaznaczone: false },
    { nazwa: "Przeglądanie tylko swoich wizyt", zaznaczone: false },
    { nazwa: "Brak uprawnień", zaznaczone: false },
  ]);

  const [uzytkownicy, setUzytkownicy] = useState(undefined);
  const [wybraneUprawnienia, setWybraneUprawnienia] = useState([]);

  const handleCheckboxChange = (index) => {
    const zaktualizowaneFunkcjonalnosci = [...funkcjonalnosci];
    console.log("index", index, "funkcjonalnosci.length", funkcjonalnosci.length);

    // Jeśli kliknięto "Brak uprawnień", odznacz wszystkie inne opcje
    if (index === funkcjonalnosci.length - 1) {
      zaktualizowaneFunkcjonalnosci[index].zaznaczone = !zaktualizowaneFunkcjonalnosci[index].zaznaczone;
      zaktualizowaneFunkcjonalnosci.forEach((funkcja, idx) => {
        if (idx !== index) {
          zaktualizowaneFunkcjonalnosci[idx].zaznaczone = false;
        }
      });
    } else {
      // Jeśli kliknięto dowolną inną opcję, odznacz "Brak uprawnień"
      if (zaktualizowaneFunkcjonalnosci[funkcjonalnosci.length - 1].zaznaczone) {
        zaktualizowaneFunkcjonalnosci[funkcjonalnosci.length - 1].zaznaczone = false;
      }
      zaktualizowaneFunkcjonalnosci[index].zaznaczone = !zaktualizowaneFunkcjonalnosci[index].zaznaczone;
    }

    setFunkcjonalnosci(zaktualizowaneFunkcjonalnosci);
  };

  const handleSearch = async () => {
    const wybrane = funkcjonalnosci.filter((funkcja) => funkcja.zaznaczone);
    const searchParams = wybrane.map((funkcja) => funkcja.nazwa);
    setWybraneUprawnienia(searchParams);
    try {
      const response = await axios.post("http://localhost:3000/backend/admin/search-by-rights", { searchParams });
      setUzytkownicy(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.post("http://localhost:3000/backend/admin/search-by-rights", {});
      setUzytkownicy(response.data);
    };

    getUsers();
  }, []);

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
              <th>Uprawnienia</th>
            </tr>
          </thead>
          <tbody>
            {uzytkownicy?.map((uzytkownik, index) => (
              <tr key={index}>
                <td>{uzytkownik.login}</td>
                <td>{uzytkownik.email}</td>
                <td>{uzytkownik.isAdmin ? "Admin" : "Użytkownik"}</td>
                <td>
                  {(() => {
                    const userRights = funkcjonalnosci.filter((funkcja) =>
                      uzytkownik.rights.includes(funkcja.nazwa)
                    );

                    // Return either a list of rights or a div indicating no rights
                    return userRights.length > 0 ? (
                      <ul>
                        {userRights.map((funkcja, idx) => (
                          <li key={idx}>{funkcja.nazwa}</li>
                        ))}
                      </ul>
                    ) : (
                      <div>Brak uprawnień</div>
                    );
                  })()}
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
