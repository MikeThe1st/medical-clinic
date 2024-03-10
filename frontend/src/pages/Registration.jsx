import React from "react";
import "../css/Registration.css";

const Registration = () => {
	return (
		<div className="Registration-container">
			<h1>Zarejestruj sie! </h1>

			<div className="Registration-form">
				<div className="Registration-column">
					{/* Pierwsza kolumna */}
					<label htmlFor="userId">Identyfikator użytkownika (Login)</label>
					<br />
					<input
						type="text"
						id="userId"
						name="userId"
						placeholder="Enter your username"
						required
					/>
					<br />
					<label htmlFor="firstName">Imię</label>
					<br />
					<input
						type="text"
						id="firstName"
						name="firstName"
						placeholder="Enter your first name"
						required
					/>
					<br />
					<label htmlFor="lastName">Nazwisko</label>
					<br />
					<input
						type="text"
						id="lastName"
						name="lastName"
						placeholder="Enter your last name"
						required
					/>
					<br />
					<label htmlFor="city">Miejscowość</label>
					<br />
					<input
						type="text"
						id="city"
						name="city"
						placeholder="Enter your city"
						required
					/>
					<br />
					<label htmlFor="postalCode">Kod pocztowy</label>
					<br />
					<input
						type="text"
						id="postalCode"
						name="postalCode"
						placeholder="Enter your postal code"
						required
					/>
					<br />
					<label htmlFor="street">Ulica</label>
					<br />
					<input
						type="text"
						id="street"
						name="street"
						placeholder="Enter your street"
					/>
                    <br />
                    <label htmlFor="buildingNumber">Numer posesji</label>
					<br />
					<input
						type="text"
						id="buildingNumber"
						name="buildingNumber"
						placeholder="Enter your building number"
						required
					/>
				</div>

				<div className="Registration-column">
					{/* Druga kolumna */}
				
					<label htmlFor="apartmentNumber">Numer lokalu</label>
					<br />
					<input
						type="text"
						id="apartmentNumber"
						name="apartmentNumber"
						placeholder="Enter your apartment number"
					/>
					<br />
					<label htmlFor="pesel">Numer PESEL</label>
					<br />
					<input
						type="text"
						id="pesel"
						name="pesel"
						placeholder="Enter your PESEL number"
						required
					/>
					<br />
					<label htmlFor="birthdate">Data urodzenia</label>
					<br />
					<input type="date" id="birthdate" name="birthdate" required />
					<br />
					<label htmlFor="gender">Płeć (kobieta/mężczyzna)</label>
					<br />
					<select id="gender" name="gender" required>
						<option value="female">Kobieta</option>
						<option value="male">Mężczyzna</option>
					</select>
					<br />
					<label htmlFor="email">Adres e-mail</label>
					<br />
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Enter your email"
						required
					/>
					<br />
					<label htmlFor="phoneNumber">Numer telefonu</label>
					<br />
					<input
						type="tel"
						id="phoneNumber"
						name="phoneNumber"
						placeholder="Enter your phone number"
						required
					/>
					<br />
                    <div className="Registration-button-container">
          <button type="submit">Zarejestruj się</button>
        </div>
				</div>
			</div>
		</div>
	);
};

export default Registration;
