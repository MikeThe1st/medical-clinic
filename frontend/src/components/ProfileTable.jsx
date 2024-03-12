// Importujemy potrzebne biblioteki React
import React from 'react';

// Komponent UserTable do wyświetlania informacji o użytkownikach
const ProfilTable = ({ users }) => {
  if (!users || !users.length) {
    return <div>No users to display</div>; // or handle the undefined/null case appropriately
  }
  return (
    <div>
      <h2>Lista Użytkownik</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Miejscowość</th>
            <th>Kod pocztowy</th>
            <th>Ulica</th>
            <th>Nr posesji</th>
            <th>Nr lokalu</th>
            <th>PESEL</th>
            <th>Data urodzenia</th>
            <th>Płeć</th>
            <th>Email</th>
            <th>Nr telefonu</th>
            {/* Dodaj inne nagłówki według potrzeb */}
          </tr>
        </thead>
        <tbody>
          {/* Mapujemy użytkowników i renderujemy odpowiednie wiersze */}
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.login}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address.city}</td>
              <td>{user.address.zipCode}</td>
              <td>{user.address.street || '-'}</td>
              <td>{user.address.houseNumber}</td>
              <td>{user.address.apartmentNumber || '-'}</td>
              <td>{user.pesel}</td>
              <td>{user.birthDate}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilTable;
