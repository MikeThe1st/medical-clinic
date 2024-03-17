import React from "react";
import "../css/DoctorsTable.css";

const DoctorTable = ({ doctors }) => {
  const handleReservation = (doctorId) => {
    alert(`Zarezerwowano lekarza o ID: ${doctorId}`);
  };

  return (
    <div className="sm:mx-[20vw]">
      <h1 className="h1-doctor">Lista Lekarzy</h1>
      <table className="table-doctor">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Specjalizacja</th>
            <th>Ocena</th>
            <th>Cena</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.lastName}</td>
              <td>{doctor.type}</td>
              <td>{doctor.rating}</td>
              <td>{doctor.price}</td>
              <td>
                <button onClick={() => handleReservation(doctor.id)}>Zarezerwuj</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
