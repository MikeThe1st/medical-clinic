import React from "react";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Contact = () => {
	return (
		<div className="w-screen">
			<Navbar />
			<ContactForm />
			<Footer />
		</div>
	);
};

export default Contact;
