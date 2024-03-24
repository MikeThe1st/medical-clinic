import React from "react";
import "../css/Main.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorAppointmentCalendar from "../components/DoctorAppointmentCalendar";
import "../css/calender.css";
const initialAppointments = [
	{
		date: "2024-03-20",
		time: "10:00 AM",
		doctor: "Dr. Smith",
		patient: "John Doe",
	},
	{
		date: "2024-03-22",
		time: "02:00 PM",
		doctor: "Dr. Johnson",
		patient: "Jane Smith",
	},
	// Add more initial appointments as needed
];
const Visits = () => {
	return (
		<div className="w-screen">
			<Navbar />
			<DoctorAppointmentCalendar />
			<Footer />
		</div>
	);
};

export default Visits;
