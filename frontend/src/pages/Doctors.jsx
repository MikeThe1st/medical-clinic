import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorTable from "../components/DoctorTable"; // Importujemy komponent DoctorTable

const Doctors = () => {

  const doctorsArray = [
    {
      id: 1,
      name: "John",
      lastName: "Doe",
      type: "Cardiologist",
      rating: 4.5,
      price: "$150"
    },
    {
      id: 2,
      name: "Jane",
      lastName: "Smith",
      type: "Dermatologist",
      rating: 4.8,
      price: "$200"
    },
    {
      id: 3,
      name: "Emily",
      lastName: "Jones",
      type: "Neurologist",
      rating: 4.6,
      price: "$180"
    },
    {
      id: 4,
      name: "Michael",
      lastName: "Brown",
      type: "Pediatrician",
      rating: 4.7,
      price: "$140"
    }
  ];

  return (
    <div className="w-screen h-screen">
      <Navbar />
      {/* Przekazujemy listę lekarzy do komponentu DoctorTable */}
      <DoctorTable doctors={doctorsArray} />
      <Footer />
    </div>
  );
};

export default Doctors;
