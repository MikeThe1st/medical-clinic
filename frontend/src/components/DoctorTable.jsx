import React, { useEffect, useState } from "react";
import "../css/DoctorsTable.css";
import axios from "axios";

const DoctorTable = () => {
  const handleReservation = (doctorId) => {
    window.location.href = `/visits?id=${doctorId}`;
  };

  const [doctors, setDoctors] = useState(undefined);
  const [searchName, setSearchName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchSpecialization, setSearchSpecialization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      const response = await axios.get("http://localhost:3000/backend/doctor/doctors");
      setDoctors(response.data);
      setFilteredDoctors(response.data); // Initialize filteredDoctors with all doctors
    };

    getDoctors();
  }, []);

  const searchFilter = (doctor) => {
    const nameMatch = doctor.name.toLowerCase().includes(searchName.toLowerCase());
    const lastNameMatch = doctor.lastName.toLowerCase().includes(searchLastName.toLowerCase());
    const specializationMatch = doctor.type.toLowerCase().includes(searchSpecialization.toLowerCase());

    return nameMatch && lastNameMatch && specializationMatch;
  };

  const handleSearch = () => {
    const filtered = doctors.filter(searchFilter);
    setFilteredDoctors(filtered); // Update filteredDoctors state with filtered results

    if (filtered.length === 1) {
      alert(`Znaleziono lekarza: ${filtered[0].name} ${filtered[0].lastName}`);
    } else {
      alert(`Znaleziono ${filtered.length} lekarzy`);
    }
  };

  const handleClear = () => {
    setSearchName("");
    setSearchLastName("");
    setSearchSpecialization("");
    setFilteredDoctors(doctors); // Reset filteredDoctors to all doctors
  };

  return (
    <div className="sm:mx-[20vw]">
      <h1 className="h1-doctor">Lista Lekarzy</h1>
      <div className="search-fields">
        <input
          type="text"
          placeholder="Imię..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nazwisko..."
          value={searchLastName}
          onChange={(e) => setSearchLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Specjalizacja..."
          value={searchSpecialization}
          onChange={(e) => setSearchSpecialization(e.target.value)}
        />
        <button onClick={handleSearch}>Szukaj</button>
        <button onClick={handleClear}>Wyczyść</button> {/* Clear button */}
      </div>
      <table className="table-doctor">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Specjalizacja</th>
            <th>Ocena</th>
            <th>Cena</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.lastName}</td>
              <td>{doctor.type}</td>
              <td>{doctor.rating}</td>
              <td>{doctor.price}zł</td>
              <td>
                <button onClick={() => handleReservation(doctor._id)}>Zarezerwuj</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
