import React, { useState, useRef, useEffect } from "react";
import "../css/ScrollableTable.css"; // Importowanie pliku z stylami CSS
import axios from "axios";

const ScrollableTable = () => {
	// Przykładowe dane
	let sampleData = [
		{
			patientFirstName: "Jan",
			patientLastName: "Kowalski",
			patientPESEL: "12345678901",
			doctorFirstName: "Anna",
			doctorLastName: "Nowak",
			doctorSpecialization: "Pediatra",
			doctorStatus: "Aktywna",
			visitDay: "29.04.2003",
			hours: "11:11",
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
			hours: "11:12",
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
	const [dateBegin, setDateBegin] = useState("")
	const [dateEnd, setDateEnd] = useState("")
	const [searchvisitDay, setvisitDay] = useState("");
	const [reservations, setReservations] = useState([]);

	const lastInputRef = useRef(null);


	const handleSearchChange = (event, setSearchTerm) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		if (lastInputRef.current) {
			lastInputRef.current.style.width = `${lastInputRef.current.scrollWidth}px`;
		}
	}, [searchTermDoctorSpecialization]);

	useEffect(() => {
		async function fetchReserations() {
			const response = await axios.get('http://localhost:3000/backend/patient/reservations')
			console.log(response)
			// console.log(response.data)
			setReservations(response.data)
		}

		fetchReserations()
	}, [])

	const handleSearch = () => {
		// console.log(dateBegin)
		// Wyświetlenie wszystkich danych w formie alertu
		// alert(JSON.stringify(filteredData, null, 2));
		let filteredData = reservations.filter(row => (
			(searchTermPatientFirstName === "" || row.patientFirstName.startsWith(searchTermPatientFirstName)) &&
			(searchTermPatientLastName === "" || row.patientLastName.startsWith(searchTermPatientLastName)) &&
			(searchTermPatientPESEL === "" || row.patientPESEL.startsWith(searchTermPatientPESEL)) &&
			(searchTermDoctorFirstName === "" || row.doctorFirstName.startsWith(searchTermDoctorFirstName)) &&
			(searchTermDoctorLastName === "" || row.doctorLastName.startsWith(searchTermDoctorLastName)) &&
			(searchTermDoctorSpecialization === "" || row.doctorSpecialization.startsWith(searchTermDoctorSpecialization)) &&
			(searchTermDoctorStatus === "" || row.doctorStatus.startsWith(searchTermDoctorStatus)) &&
			(searchvisitDay === "" || row.visitDay.startsWith(searchvisitDay))
		))
			.filter(row => {
				const visitDate = parseDDMMYYYY(row.visitDay)
				// console.log("visit", row.visitDay)
				// console.log(dateBegin, dateEnd)
				// console.log(new Date(dateBegin).toISOString().split('T')[0])
				if (dateBegin && dateEnd) {
					return visitDate >= new Date(dateBegin) && visitDate <= new Date(dateEnd);
				} else if (dateBegin) {
					// console.log(new Date(dateBegin))
					return visitDate >= new Date(dateBegin);
				} else if (dateEnd) {
					return visitDate <= new Date(dateEnd);
				}
				return true;  // If neither dateBegin nor dateEnd is provided, include all rows
			});



		// sampleData = filteredData
		// alert(JSON.stringify(filteredData))
		console.log(filteredData)
		setReservations(filteredData)
	};

	function parseDDMMYYYY(dateString) {
		const [day, month, year] = dateString.split('.').map(Number);
		return new Date(year, month - 1, day); // Months are 0-based in JavaScript Date
	}

	return (
		<div className="scrollable-table-container">
			<div className="search-inputs flex">
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
				<div className="flex flex-row">
					<label className="m-2">Data od:</label>
					<input type="date"
						value={dateBegin}
						onChange={(event) =>
							handleSearchChange(event, setDateBegin)
						}
					/>
					<label className="m-2">Data do:</label>
					<input type="date"
						value={dateEnd}
						onChange={(event) =>
							handleSearchChange(event, setDateEnd)
						}
					/>
				</div>
			</div>
			<button onClick={handleSearch}>Wyszukaj</button>
			<div className="scrollable-table">
				<table className="mx-8">
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
							<th>Godzina</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						{reservations?.map((row, index) => (
							<tr key={index}>
								<td>{row.patientFirstName}</td>
								<td>{row.patientLastName}</td>
								<td>{row.patientPESEL}</td>
								<td>{row.doctorFirstName}</td>
								<td>{row.doctorLastName}</td>
								<td>{row.status}</td>
								<td>{row.doctorSpecialization}</td>
								<td>{row.visitDay}</td>
								<td>{row.hours}</td>
								<td>
									{" "}
									<div>
										{" "}
										<button
											onClick={() => {
												window.location.href = `/visit-data?id=${row.reservationId}`;
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

			</div>
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
	);
};

export default ScrollableTable;
