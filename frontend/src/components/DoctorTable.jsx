import React, { useEffect, useState } from "react";
import "../css/DoctorsTable.css";
import axios from "axios";


const DoctorTable = () => {
  const handleReservation = (doctorId) => {
    window.location.href = `/visits?id=${doctorId}`
  };

  const [doctors, setDoctors] = useState(undefined)

  useEffect(() => {
    const getDoctors = async () => {
      const response = await axios.get(`http://localhost:3000/backend/doctor/doctors`)
      setDoctors(response.data)
      console.log(response.data)
    }

    getDoctors()
    console.log(doctors)
  }, [])

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
          {doctors?.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor._id}</td>
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
