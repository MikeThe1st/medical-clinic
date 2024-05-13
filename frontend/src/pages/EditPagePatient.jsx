import React from "react";
import Navbar from "../components/Navbar";
import "../css/EditPage.css";
import EditTable from "../components/EditTable";

const EditPagePatient = () => {
    const userArray = [
        {
            id: 1,
            login: "john_doe_login",
            firstName: "John",
            lastName: "Doe",
            address: {
                city: "New York",
                zipCode: "10001",
                street: "Broadway",
                houseNumber: "123",
                apartmentNumber: "45",
            },
            pesel: "12345678901",
            birthDate: "1990-01-15",
            gender: "Male",
            email: "john.doe@example.com",
            phoneNumber: "123-456-789",
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="edit-container">
                <EditTable userData={userArray} /> {/* Przekazanie danych użytkownika do tabeli */}
            </div>
        </div>
    );
};

export default EditPagePatient;
