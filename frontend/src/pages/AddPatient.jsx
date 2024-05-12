import React from "react";
import "../css/Registration.css";
import FormPatient from "../components/FormPatient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const AddPatient = () => {
	return (
		<div className="w-screen">
			<Navbar />
			<FormPatient/>
			<Footer />
		</div>
	);
};

export default AddPatient;
