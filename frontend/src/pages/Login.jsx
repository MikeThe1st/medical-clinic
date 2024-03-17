import React from "react";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Login = () => {
	return (
		<div className="w-screen">
			<Navbar />
			<LoginForm />
			<Footer />
		</div>
	);
};

export default Login;
