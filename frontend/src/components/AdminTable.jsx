import React from "react";
import axios from "axios";

const AdminTable = ({ users }) => {

    if (!users || users.length === 0) {
        return (
            <div>
                <h2>Lista Użytkowników</h2>
                <p className="text-4xl text-bold">No users found!</p>
                <p className="text-4xl text-bold">Loading...</p>
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
                            <button onClick={() => {
    const roleText = user.isAdmin ? 'Admin' : 'Użytkownik';
    alert(`ID: ${user._id}, Rola: ${roleText}`);
}}>
    {user.isAdmin ? 'Admin' : 'Użytkownik'}
</button>

                            </td>
                            <td>
                                <button onClick={(e) => { e.preventDefault(); window.location.href = `/edit-page?login=${user.login}` }}>Edytuj</button>
                                <button onClick={(e) => { e.preventDefault(); window.location.href = `/change-password?login=${user.login}` }}>Zmień hasło</button>
                                <button onClick={(e) => { e.preventDefault(); window.location.href = `/user-page?login=${user.login}` }}>Wyświetl dane</button>
                                {user.disabled ? <></> :
                                    <button onClick={async (e) => {
                                        e.preventDefault();
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
