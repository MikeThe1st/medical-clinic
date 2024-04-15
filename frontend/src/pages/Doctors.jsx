import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorTable from "../components/DoctorTable"; // Importujemy komponent DoctorTable

const Doctors = () => {

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <DoctorTable />
      <Footer />
    </div>
  );
};

export default Doctors;
