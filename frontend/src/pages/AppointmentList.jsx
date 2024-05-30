import React from "react";
import AppointmentTable from "../components/AppointmentTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const AppointmentList = () => {
	return (
		<div className="w-screen">
			<Navbar />
		<AppointmentTable></AppointmentTable>
			<Footer />
		</div>
	);
};

export default AppointmentList;