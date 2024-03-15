import React from "react";
import "../css/Registration.css";
import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Registration = () => {
	return (
		<div>
			<Navbar />
			<RegisterForm />
			<Footer/>
		</div>
	);
};

export default Registration;
