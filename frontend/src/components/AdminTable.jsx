import React from "react";

const AdminTable = ({ users }) => {
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
								<button>Edytuj</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminTable;
