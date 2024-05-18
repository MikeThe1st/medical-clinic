import React, { useState, useRef, useEffect } from "react";
import "../css/ScrollableTable.css"; // Importowanie pliku z stylami CSS

const ScrollableTable = () => {
	// Przykładowe dane
	const sampleData = [
		{
			patientFirstName: "Jan",
			patientLastName: "Kowalski",
			patientPESEL: "12345678901",
			doctorFirstName: "Anna",
			doctorLastName: "Nowak",
			doctorSpecialization: "Pediatra",
			doctorStatus: "Aktywna",
			visitDay: "29.04.2003",
		},
		{
			patientFirstName: "Alicja",
			patientLastName: "Nowak",
			patientPESEL: "23456789012",
			doctorFirstName: "Piotr",
			doctorLastName: "Wiśniewski",
			doctorSpecialization: "Internista",
			doctorStatus: "Aktywna",
			visitDay: "29.04.2003",
		},
		// Dodaj więcej przykładowych danych według potrzeb
	];

	const [searchTermPatientFirstName, setSearchTermPatientFirstName] =
		useState("");
	const [searchTermPatientLastName, setSearchTermPatientLastName] =
		useState("");
	const [searchTermPatientPESEL, setSearchTermPatientPESEL] = useState("");
	const [searchTermDoctorFirstName, setSearchTermDoctorFirstName] =
		useState("");
	const [searchTermDoctorLastName, setSearchTermDoctorLastName] = useState("");
	const [searchTermDoctorSpecialization, setSearchTermDoctorSpecialization] =
		useState("");
	const [searchTermDoctorStatus, setSearchTermDoctorStatus] = useState("");
	const [searchvisitDay, setvisitDay] = useState("");

	const lastInputRef = useRef(null);

	const handleSearchChange = (event, setSearchTerm) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		if (lastInputRef.current) {
			lastInputRef.current.style.width = `${lastInputRef.current.scrollWidth}px`;
		}
	}, [searchTermDoctorSpecialization]);

	const filteredData = sampleData.filter(
		(row) =>
			row.patientFirstName
				.toLowerCase()
				.includes(searchTermPatientFirstName.toLowerCase()) &&
			row.patientLastName
				.toLowerCase()
				.includes(searchTermPatientLastName.toLowerCase()) &&
			row.patientPESEL.includes(searchTermPatientPESEL) &&
			row.doctorFirstName
				.toLowerCase()
				.includes(searchTermDoctorFirstName.toLowerCase()) &&
			row.doctorLastName
				.toLowerCase()
				.includes(searchTermDoctorLastName.toLowerCase()) &&
			row.doctorSpecialization
				.toLowerCase()
				.includes(searchTermDoctorSpecialization.toLowerCase()) &&
			row.doctorStatus.toLowerCase().includes(searchvisitDay.toLowerCase()) &&
			row.doctorStatus.toLowerCase().includes
	);
	const handleSearch = () => {
		// Wyświetlenie wszystkich danych w formie alertu
		alert(JSON.stringify(filteredData, null, 2));
	};

	return (
		<div className="scrollable-table-container">
			<div className="search-inputs">
				<input
					type="text"
					placeholder="Imię pacjenta..."
					value={searchTermPatientFirstName}
					onChange={(event) =>
						handleSearchChange(event, setSearchTermPatientFirstName)
					}
				/>
				<input
					type="text"
					placeholder="Nazwisko pacjenta..."
					value={searchTermPatientLastName}
					onChange={(event) =>
						handleSearchChange(event, setSearchTermPatientLastName)
					}
				/>
				<input
					type="text"
					placeholder="PESEL pacjenta..."
					value={searchTermPatientPESEL}
					onChange={(event) =>
						handleSearchChange(event, setSearchTermPatientPESEL)
					}
				/>
				<input
					type="text"
					placeholder="Imię lekarza..."
					value={searchTermDoctorFirstName}
					onChange={(event) =>
						handleSearchChange(event, setSearchTermDoctorFirstName)
					}
				/>
				<input
					type="text"
					placeholder="Nazwisko lekarza..."
					value={searchTermDoctorLastName}
					onChange={(event) =>
						handleSearchChange(event, setSearchTermDoctorLastName)
					}
				/>
				<input
					type="text"
					placeholder="Status"
					value={searchTermDoctorLastName}
					onChange={(event) =>
						handleSearchChange(event, setSearchTermDoctorStatus)
					}
				/>
				<input
					ref={lastInputRef}
					type="text"
					placeholder="Specjalizacja lekarza..."
					value={searchTermDoctorSpecialization}
					onChange={(event) =>
						handleSearchChange(event, setSearchTermDoctorSpecialization)
					}
				/>
			</div>
			<button onClick={handleSearch}>Wyszukaj</button>
			<div className="scrollable-table">
				<table>
					<thead>
						<tr>
							<th>Imię pacjenta</th>
							<th>Nazwisko pacjenta</th>
							<th>PESEL pacjenta</th>
							<th>Imię lekarza</th>
							<th>Nazwisko lekarza</th>
							<th>Status</th>
							<th>Specjalizacja lekarza</th>
							<th>Termin</th>
                            <th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((row, index) => (
							<tr key={index}>
								<td>{row.patientFirstName}</td>
								<td>{row.patientLastName}</td>
								<td>{row.patientPESEL}</td>
								<td>{row.doctorFirstName}</td>
								<td>{row.doctorLastName}</td>
								<td>{row.doctorStatus}</td>
								<td>{row.doctorSpecialization}</td>
                                <td>{row.visitDay}</td>
								<td>
									{" "}
									<div>
										{" "}
										<button
											onClick={() => {
												window.location.href = "/VisitData";
											}}
										>
											{" "}
											Dane z wizyty{" "}
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div>
					{" "}
					<button
						onClick={() => {
							window.location.href = "/Admin";
						}}
					>
						{" "}
						Back to Admin{" "}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ScrollableTable;
