import React, { useState } from "react";
import axios from "axios";
import "../css/AddNewHours.css"; // Załóżmy, że plik CSS zawiera style dla powiększonej sekcji

function AddNewHours() {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedHourFrom, setSelectedHourFrom] = useState("");
  const [selectedHourTo, setSelectedHourTo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/your-endpoint", {
        id,
        firstName,
        lastName,
        selectedMonth,
        selectedYear,
        selectedDay,
        selectedHourFrom,
        selectedHourTo,
      });
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
            <option value="">Select Month</option>
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
            <option value="">Select Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
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
            <option value="">Select Day</option>
            {renderDays()}
          </select>
        </div>
        <div>
          <label htmlFor="hourFrom">Hour From:</label>
          <input
            type="text"
            id="hourFrom"
            value={selectedHourFrom}
            onChange={(e) => setSelectedHourFrom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="hourTo">Hour To:</label>
          <input
            type="text"
            id="hourTo"
            value={selectedHourTo}
            onChange={(e) => setSelectedHourTo(e.target.value)}
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
