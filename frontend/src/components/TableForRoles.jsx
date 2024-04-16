import React, { useState, useEffect } from "react";
import "../css/RolesTable.css";
import axios from "axios";
import { useLocation } from 'react-router-dom'

const TableForRoles = () => {

    const [userData, setUserData] = useState({
        login: "",
        name: "",
        lastName: "",
        location: {
            city: "",
            postalCode: "",
            street: "",
            propertyNumber: "",
            apartmentNumber: "",
        },
        pesel: "",
        birthDate: "",
        gender: "",
        email: "",
        phoneNumber: ""
    })

    const [rights, setRights] = useState([
        { id: 1, name: "Zmiana hasła", isChecked: false },
        { id: 2, name: "Edycja użytkownika", isChecked: false },
        { id: 3, name: "Wyświetlenie szczegółowych danych", isChecked: false },
        { id: 4, name: "Nadawanie/usuwanie admina", isChecked: false },
        { id: 5, name: "Nadawanie uprawnień", isChecked: false },
        { id: 6, name: "Umawianie wizyt", isChecked: false },
        { id: 7, name: "Dodawanie użytkowników", isChecked: false },
        { id: 8, name: "Wyszukiwanie po uprawnieniach", isChecked: false },
    ])

    const handleCheckboxChange = (name) => {
        setRights((prevrights) =>
            prevrights.map((rights) =>
                rights.name === name ? { ...rights, isChecked: !rights.isChecked } : rights
            )
        );
        console.log(rights)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const selectedRights = rights.filter(rights => rights.isChecked).map(rights => rights.name)
        console.log(selectedRights)

        try {
            await axios.post('http://localhost:3000/backend/admin/change-user-rights', {
                login: userData.login,
                rights: selectedRights
            })
            alert('rights updated successfully!')
            window.location.reload()
        } catch (error) {
            if (error.response.status == 403) alert(error.response.data.msg)
            console.error('Failed to update rights:', error);
        }
    };

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('login')

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`http://localhost:3000/backend/admin/user-data/${query}`)
            setUserData(response.data)
        }

        getUser()
    }, []);

    useEffect(() => {
        userData?.rights?.map(right => {
            rights.map(frontRight => {
                if (frontRight.name == right) {
                    frontRight.isChecked = true
                }
            })
        })
    }, [userData])

    return (
        <div className="container">
            <h2 className="title">Nadawanie uprawnień dla: {userData?.login}</h2>
            <table className="rolesTable">
                <tbody>
                    {rights?.map((right) => (
                        <tr key={right.name}>
                            <td>
                                <input
                                    type="checkbox"
                                    id={`right${right.id}`}
                                    className="checkbox"
                                    checked={right.isChecked}
                                    onChange={() => handleCheckboxChange(right.name)}
                                />
                            </td>
                            <td className="label-center">
                                <label htmlFor={`right${right.id}`}>{right.name}</label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit} className="mx-auto flex mt-8 mb-4">Zapisz zmiany</button>
        </div>
    );
};

export default TableForRoles;
