import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AddNewHours.css"; // Załóżmy, że plik CSS zawiera style dla powiększonej sekcji
import { useLocation } from "react-router-dom";

function AddNewHours() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedDay, setSelectedDay] = useState("01");
  const [selectedHour, setSelectedHour] = useState("10:00");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/backend/doctor/add-working-date", {
        id,
        selectedMonth,
        selectedYear,
        selectedDay,
        selectedHour
      }, { withCredentials: true });
      console.log(response)
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred while submitting the form.");
    }
  };

  const renderDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return days;
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("id");
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/backend/doctor/${query}`
        );
        setId(query)
        setFirstName(response.data.name)
        setLastName(response.data.lastName)
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    getDoctor()

  }, [])

  return (
    <div className="add-new-hours-container"> {/* Dodana klasa CSS */}
      <h2>Add New Hours</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled
          />
        </div>
        <div>
          <label htmlFor="month">Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            required
          >
            {/* <option value="">Select Month</option> */}
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            required
          >
            {/* <option value="">Select Year</option> */}
            {/* <option value="2023">2023</option> */}
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div>
          <label htmlFor="day">Day:</label>
          <select
            id="day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            required
          >
            {/* <option value="">Select Day</option> */}
            {renderDays()}
          </select>
        </div>
        <div>
          <label htmlFor="hourFrom">Hour (format XX:XX):</label>
          <input
            type="text"
            id="hourFrom"
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div> <button onClick={() => { window.location.href = '/doctors' }}> Powrót do  doktorów </button></div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddNewHours;
