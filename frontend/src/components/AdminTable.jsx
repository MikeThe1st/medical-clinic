import React from "react";

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
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Login</th>
						<th>Imię</th>
						<th>Nazwisko</th>
						<th>Płeć</th>
						<th>Email</th>
						<th>Nr telefonu</th>
						<th>Akcje</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.login}</td>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td>{user.gender}</td>
							<td>{user.email}</td>
							<td>{user.phoneNumber}</td>
							<td>
								<button onClick={(e) => { e.preventDefault(); alert(user.login) }}>Edytuj</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminTable;
