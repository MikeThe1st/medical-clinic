import React from "react";
import axios from "axios";

const AdminTable = ({ users, adminRights }) => {

    if (!users || users.length === 0) {
        return (
            <div>
                <h2>Lista Użytkowników</h2>
                <p className="text-4xl text-bold">No users found!</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Lista Użytkowników</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Login</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Płeć</th>
                        <th>Email</th>
                        <th>Nr telefonu</th>
                        <th>Rola</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user._id}</td>
                            <td>{user.login}</td>
                            <td>{user.name}</td>
                            <td>{user.lastName}</td>
                            <td>{user.gender}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                <button onClick={async (e) => {
                                    e.preventDefault()
                                    //Checking if logged admin has rights
                                    if (!adminRights.includes("Nadawanie/usuwanie admina")) return alert("You don't have rights!")

                                    const areYouSure = confirm(`Czy chcesz rolę użytkownika z loginem:${user.login} na ${user.isAdmin ? 'Użytkownika' : 'Admina'}?`)
                                    if (areYouSure) {
                                        await axios.post(`http://localhost:3000/backend/admin/switch-user-role`, { login: user.login });
                                        window.location.reload()
                                    }
                                }}>
                                    {user.isAdmin ? 'Admin' : 'Użytkownik'}
                                </button>

                            </td>
                            <td>
                                <button onClick={(e) => { e.preventDefault(); if (!user.isAdmin) return alert("You cannot set rights to default user, switch to admin first!"); if (!adminRights.includes("Nadawanie uprawnień")) return alert("You don't have rights!"); window.location.href = `/rights?login=${user.login}` }}>Zmień uprawnienia</button>
                                <button onClick={(e) => { e.preventDefault(); if (!adminRights.includes("Edycja użytkownika")) return alert("You don't have rights!"); window.location.href = `/edit-page?login=${user.login}` }}>Edytuj</button>
                                <button onClick={(e) => { e.preventDefault(); if (!adminRights.includes("Zmiana hasła")) return alert("You don't have rights!"); window.location.href = `/change-password?login=${user.login}` }}>Zmień hasło</button>
                                {/* <button onClick={(e) => { e.preventDefault(); if (!adminRights.includes("Wyświetlenie szczegółowych danych")) return alert("You don't have rights!"); window.location.href = `/user-page?login=${user.login}` }}>Wyświetl dane</button> */}
                                {user.disabled ? <></> :
                                    <button onClick={async (e) => {
                                        e.preventDefault();
                                        if (!adminRights.includes("Nadawanie/usuwanie admina")) return alert("You don't have rights!");

                                        const areYouSure = confirm(`Do you want to disable ${user.login}?`)
                                        if (areYouSure) {
                                            await axios.post(`http://localhost:3000/backend/admin/disable-user `, { login: user.login });
                                            window.location.reload()
                                        }
                                    }}>Usuń</button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;
