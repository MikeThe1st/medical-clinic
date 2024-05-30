import React from "react";
import "../css/Main.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VisitDAta from"../components/VisitDAta";

const VisitData = () => {
	return (
		<div className="w-screen">
			<Navbar />
			< VisitDAta></VisitDAta>
			<Footer />
		</div>
	);
};

export default VisitData;