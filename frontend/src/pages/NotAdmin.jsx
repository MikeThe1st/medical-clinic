import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/NotAdmin.css";

const NotAdmin = () => {
    return (
        <div>
            <Navbar />
            <div className="not-admin-message">Nie masz uprawnień administratora</div>
            <Footer />
        </div>
    );
};

export default NotAdmin;
