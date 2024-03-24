import React, { useState } from "react";
import "../css/DocCalendar.css";

const doctor = {
	_id: "doc123",
	name: "John",
	lastName: "Doe",
	type: "General Practitioner",
	workingDates: {
	  "2024-08-01": {
		"09:00": false,
		"10:00": true,
		"11:00": false,
		"14:00": true,
		"15:00": false
	  },
	  "2024-08-02": {
		"09:00": true,
		"10:00": true,
		"11:00": false,
		"14:00": false,
		"15:00": true
	  },
	  "2024-08-03": {
		"09:00": false,
		"10:00": false,
		"11:00": false,
		"14:00": false,
		"15:00": false
	  },
	  "2024-08-04": {
	  "09:00": true,
	  "10:00": false,
	  "11:00": true,
	  "14:00": true,
	  "15:00": false
	},
	"2024-08-05": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": false,
	  "14:00": true,
	  "15:00": true
	},
	"2024-08-06": {
	  "09:00": true,
	  "10:00": false,
	  "11:00": true,
	  "14:00": false,
	  "15:00": false
	},
	"2024-08-07": {
	  "09:00": false,
	  "10:00": false,
	  "11:00": true,
	  "14:00": true,
	  "15:00": false
	},
	"2024-08-08": {
	  "09:00": true,
	  "10:00": true,
	  "11:00": false,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-09": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": true,
	  "14:00": false,
	  "15:00": false
	},
	"2024-08-10": {
	  "09:00": true,
	  "10:00": false,
	  "11:00": false,
	  "14:00": true,
	  "15:00": true
	},
	"2024-08-11": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": false,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-12": {
	  "09:00": true,
	  "10:00": false,
	  "11:00": true,
	  "14:00": true,
	  "15:00": false
	},
	"2024-08-13": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": false,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-14": {
	  "09:00": true,
	  "10:00": true,
	  "11:00": true,
	  "14:00": false,
	  "15:00": false
	},
	"2024-08-15": {
	  "09:00": false,
	  "10:00": false,
	  "11:00": true,
	  "14:00": true,
	  "15:00": true
	},
	"2024-08-16": {
	  "09:00": true,
	  "10:00": false,
	  "11:00": false,
	  "14:00": true,
	  "15:00": false
	},
	"2024-08-17": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": true,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-18": {
	  "09:00": true,
	  "10:00": true,
	  "11:00": true,
	  "14:00": true,
	  "15:00": true
	},
	"2024-08-19": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": false,
	  "14:00": false,
	  "15:00": false
	},
	"2024-08-20": {
	  "09:00": true,
	  "10:00": false,
	  "11:00": true,
	  "14:00": true,
	  "15:00": false
	},
	"2024-08-21": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": false,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-22": {
	  "09:00": true,
	  "10:00": false,
	  "11:00": true,
	  "14:00": true,
	  "15:00": true
	},
	"2024-08-23": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": false,
	  "14:00": true,
	  "15:00": false
	},
	"2024-08-24": {
	  "09:00": true,
	  "10:00": true,
	  "11:00": true,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-25": {
	  "09:00": false,
	  "10:00": false,
	  "11:00": true,
	  "14:00": true,
	  "15:00": false
	},
	"2024-08-26": {
	  "09:00": true,
	  "10:00": true,
	  "11:00": false,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-27": {
	  "09:00": false,
	  "10:00": false,
	  "11:00": true,
	  "14:00": true,
	  "15:00": true
	},
	"2024-08-28": {
	  "09:00": true,
	  "10:00": true,
	  "11:00": false,
	  "14:00": true,
	  "15:00": false
	},
	"2024-08-29": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": true,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-30": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": true,
	  "14:00": false,
	  "15:00": true
	},
	"2024-08-31": {
	  "09:00": false,
	  "10:00": true,
	  "11:00": true,
	  "14:00": false,
	  "15:00": true
	},
	}

  }

const DoctorAppointmentCalendar = () => {
	const [selectedDay, setSelectedDay] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [appointments, setAppointments] = useState(doctor.workingDates);

	const handleDayClick = (day) => {
		setSelectedDay(day);
	};

	const handleTimeClick = (time) => {
		setSelectedTime(time);
	};

	const handleBookAppointment = () => {
		if (selectedDay && selectedTime) {
			setAppointments({
				...appointments,
				[selectedDay]: {
					...appointments[selectedDay],
					[selectedTime]: false,
				},
			});
			setSelectedDay(null);
			setSelectedTime(null);
		}
	};

	const renderDays = () => {
		const days = [];
		for (let i = 1; i <= 31; i++) {
			const day = `2024-08-${String(i).padStart(2, "0")}`;
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
				className="calendar-time"
				onClick={() => handleTimeClick(time)}
			>
				{time}
			</button>
		));
	};

	return (
		<div className="calendar-container">
			<div className="doctor-info">
				<h2>
					Your appointment with {doctor.name} {doctor.lastName}
				</h2>
				<p>Type: {doctor.type}</p>
			</div>
			<div className="calendar-month">
				<h3 className="hh3">August 2024</h3>
				<div className="calendar-days">{renderDays()}</div>
			</div>
			{selectedDay && (
				<div className="calendar-time-selector">
					<h3 className="hh3">Select a time for {selectedDay}</h3>
					<div className="calendar-times">{renderTimes(selectedDay)}</div>
					<button className="book-button" onClick={handleBookAppointment}>
						Book
					</button>
				</div>
			)}
		</div>
	);
};

export default DoctorAppointmentCalendar;
