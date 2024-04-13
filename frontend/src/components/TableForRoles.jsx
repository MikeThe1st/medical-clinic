import React from "react";
import "../css/RolesTable.css";

const TableForRoles = () => {
    const roles = [
        { name: "role1" },
        { name: "role2" },
        { name: "role3" },
        { name: "role4" },
        { name: "role5" },
        { name: "role6" },
        { name: "role7" },
        { name: "role8" },
        { name: "role9" },
        { name: "role10" },
        { name: "role11" },
        { name: "role12" },
        { name: "role13" },
        { name: "role14" },
        { name: "role15" },
        { name: "role16" },
        { name: "role17" },
        { name: "role18" },
        { name: "role19" },
        { name: "role20" },
    ];

    const userLogin = "JohnDoe"; // Zastąp rzeczywistym loginem użytkownika
	const handleCheckboxChange = (id) => {
        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === id ? { ...role, isChecked: !role.isChecked } : role
            )
        );
    };

    return (
        <div className="container">
            <h2 className="title">Nadawanie uprawnień dla {userLogin}</h2>
            <table className="rolesTable">
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    id={`role${role.id}`}
                                    className="checkbox"
                                    checked={role.isChecked}
                                    onChange={() => handleCheckboxChange(role.id)}
                                />
                            </td>
                            <td className="label-center">
                                <label htmlFor={`role${role.id}`}>{role.name}</label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button>Zapisz zmiany</button>
        </div>
    );
};

export default TableForRoles;
