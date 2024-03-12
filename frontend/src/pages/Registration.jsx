import React from "react";
import "../css/Registration.css";
import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";

const Registration = () => {
	return (
		<div>
			<Navbar />
			<RegisterForm />
		</div>
	);
};

export default Registration;
