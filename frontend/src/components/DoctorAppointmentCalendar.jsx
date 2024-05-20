import React, { useState, useEffect } from "react";
import "../css/DocCalendar.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function DoctorAppointmentCalendar() {
	const [selectedDay, setSelectedDay] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [appointments, setAppointments] = useState({});
	const [doctor, setDoctor] = useState(undefined);
	const [email, setEmail] = useState("");
	const [room, setRoom] = useState(1);
	const [description, setDescription] = useState("");
	const [selectedMonth, setSelectedMonth] = useState("08"); // Default to August
	const [selectedYear, setSelectedYear] = useState("2024"); // Default to 2024

	const location = useLocation();
	const query = new URLSearchParams(location.search).get("id");

	useEffect(() => {
		const getDoctor = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/backend/doctor/${query}`
				);
				setDoctor(response.data);
				setAppointments(response.data.workingDates || {});
			} catch (error) {
				console.error("Error fetching doctor data:", error);
			}
		};

		getDoctor();
	}, [query]);

	const handleDayClick = (day) => {
		const formattedDay = new Date(day).getUTCDate()
		setSelectedDay(formattedDay);
		setSelectedTime(null);
	};

	const handleTimeClick = (time) => {
		setSelectedTime(time);
	};

	const handleBookAppointment = async () => {
		try {
			if (selectedDay && selectedTime) {
				const visit = { query, room, email, selectedYear, selectedMonth, selectedDay, selectedTime, description }
				const response = await axios.post(
					`http://localhost:3000/backend/patient/reserve-visit`, visit
				)
				alert(response.data.msg)
				window.location.href('/doctors')
			}
		} catch (error) {
			alert(error.response.data.msg)
		}

	};

	const renderDays = () => {
		const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
		const days = [];

		for (let i = 1; i <= daysInMonth; i++) {
			const day = `${selectedYear}-${selectedMonth}-${String(i).padStart(
				2,
				"0"
			)}`;
			const dayAppointments = appointments[day] || {};
			const isAvailable = Object.values(dayAppointments).some(
				(value) => value === true
			);
			const hasAvailableSlot =
				Object.values(dayAppointments).filter((value) => value === false)
					.length < 5;
			const hasNoAvailableSlot = Object.values(dayAppointments).every(
				(value) => value === false
			);

			let buttonClass = "calendar-day";
			if (isAvailable) {
				buttonClass += " available";
			} else if (hasAvailableSlot) {
				buttonClass += " limited";
			} else {
				buttonClass += " booked";
			}

			if (hasNoAvailableSlot) {
				buttonClass += " unavailable";
			}
			buttonClass += " flex text-start p-2"

			days.push(
				<button
					key={i}
					className={buttonClass}
					onClick={() => handleDayClick(day)}
					disabled={!isAvailable && !hasAvailableSlot}
				>
					{i}
				</button>
			);
		}

		return days;
	};

	const renderTimes = (day) => {
		const dayAppointments = appointments[day] || {};
		const availableTimes = Object.keys(dayAppointments).filter(
			(time) => dayAppointments[time] === true
		);

		return availableTimes.map((time, index) => (
			<button
				key={index}
				className="text-center mx-auto"
				onClick={() => handleTimeClick(time)}
			>
				{time}
			</button>
		));
	};

	return (
		<div className="calendar-container">
			{doctor && (
				<>
					<div className="doctor-info">
						<h2>
							Zarezerwuj wizytę z Dr. {doctor.name} {doctor.lastName}
						</h2>
						<p>Typ: {doctor.type}</p>
					</div>
					<input
						type="email"
						placeholder="Email pacjenta"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<select
						value={room}
						onChange={(e) => setRoom(e.target.value)}
					>
						<option value="1">Gabinet nr.1</option>
						<option value="2">Gabinet nr.2</option>
						<option value="3">Gabinet nr.3</option>
						<option value="4">Gabinet nr.4</option>
						<option value="5">Gabinet nr.5</option>
						<option value="6">Gabinet nr.6</option>
					</select>
					<div className="description-dropdowns">
						<select
							value={selectedMonth}
							onChange={(e) => setSelectedMonth(e.target.value)}
						>
							<option value="01">Styczeń</option>
							<option value="02">Luty</option>
							<option value="03">Marzec</option>
							<option value="04">Kwiecień</option>
							<option value="05">Maj</option>
							<option value="06">Czerwiec</option>
							<option value="07">Lipiec</option>
							<option value="08">Sierpień</option>
							<option value="09">Wrzesień</option>
							<option value="10">Październik</option>
							<option value="11">Listopad</option>
							<option value="12">Grudzień</option>
						</select>
						<select
							value={selectedYear}
							onChange={(e) => setSelectedYear(e.target.value)}
						>
							<option value="2024">2024</option>
							<option value="2025">2025</option>
						</select>
					</div>
					<input
						className="description-textarea"
						type="text"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<div className="calendar-month">
						<div className="calendar-days">{renderDays()}</div>
					</div>
					{selectedDay && (
						<div className="calendar-time-selector">
							<h3 className="hh3 my-4">Wybierz godzinę dla dnia: {`${selectedYear}-${selectedMonth}-${selectedDay}`}</h3>
							<div className="calendar-times">{renderTimes(`${selectedYear}-${selectedMonth}-${selectedDay}`)}</div>
							<button className="book-button" onClick={handleBookAppointment}>
								Zarezerwuj
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default DoctorAppointmentCalendar;
