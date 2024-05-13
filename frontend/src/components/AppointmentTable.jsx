import React, { useState, useRef, useEffect } from 'react';

const ScrollableTable = () => {
    // Przykładowe dane
    const sampleData = [
        {
            patientFirstName: 'Jan',
            patientLastName: 'Kowalski',
            patientPESEL: '12345678901',
            doctorFirstName: 'Anna',
            doctorLastName: 'Nowak',
            doctorSpecialization: 'Pediatra'
        },
        {
            patientFirstName: 'Alicja',
            patientLastName: 'Nowak',
            patientPESEL: '23456789012',
            doctorFirstName: 'Piotr',
            doctorLastName: 'Wiśniewski',
            doctorSpecialization: 'Internista'
        },
        // Dodaj więcej przykładowych danych według potrzeb
    ];

    const [searchTermPatientFirstName, setSearchTermPatientFirstName] = useState('');
    const [searchTermPatientLastName, setSearchTermPatientLastName] = useState('');
    const [searchTermPatientPESEL, setSearchTermPatientPESEL] = useState('');
    const [searchTermDoctorFirstName, setSearchTermDoctorFirstName] = useState('');
    const [searchTermDoctorLastName, setSearchTermDoctorLastName] = useState('');
    const [searchTermDoctorSpecialization, setSearchTermDoctorSpecialization] = useState('');

    const lastInputRef = useRef(null);

    const handleSearchChange = (event, setSearchTerm) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (lastInputRef.current) {
            lastInputRef.current.style.width = `${lastInputRef.current.scrollWidth}px`;
        }
    }, [searchTermDoctorSpecialization]);

    const filteredData = sampleData.filter((row) =>
        row.patientFirstName.toLowerCase().includes(searchTermPatientFirstName.toLowerCase()) &&
        row.patientLastName.toLowerCase().includes(searchTermPatientLastName.toLowerCase()) &&
        row.patientPESEL.includes(searchTermPatientPESEL) &&
        row.doctorFirstName.toLowerCase().includes(searchTermDoctorFirstName.toLowerCase()) &&
        row.doctorLastName.toLowerCase().includes(searchTermDoctorLastName.toLowerCase()) &&
        row.doctorSpecialization.toLowerCase().includes(searchTermDoctorSpecialization.toLowerCase())
    );

    const handleSearch = () => {
        // Wyświetlenie wszystkich danych w formie alertu
        alert(JSON.stringify(filteredData, null, 2));
    };

    return (
        <div>
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Imię pacjenta..."
                    value={searchTermPatientFirstName}
                    onChange={(event) => handleSearchChange(event, setSearchTermPatientFirstName)}
                    style={{ width: '140px', marginRight: '10px', fontSize: '14px' }}
                />
                <input
                    type="text"
                    placeholder="Nazwisko pacjenta..."
                    value={searchTermPatientLastName}
                    onChange={(event) => handleSearchChange(event, setSearchTermPatientLastName)}
                    style={{ width: '140px', marginRight: '10px', fontSize: '14px' }}
                />
                <input
                    type="text"
                    placeholder="PESEL pacjenta..."
                    value={searchTermPatientPESEL}
                    onChange={(event) => handleSearchChange(event, setSearchTermPatientPESEL)}
                    style={{ width: '160px', marginRight: '10px', fontSize: '14px' }}
                />
                <input
                    type="text"
                    placeholder="Imię lekarza..."
                    value={searchTermDoctorFirstName}
                    onChange={(event) => handleSearchChange(event, setSearchTermDoctorFirstName)}
                    style={{ width: '140px', marginRight: '10px', fontSize: '14px' }}
                />
                <input
                    type="text"
                    placeholder="Nazwisko lekarza..."
                    value={searchTermDoctorLastName}
                    onChange={(event) => handleSearchChange(event, setSearchTermDoctorLastName)}
                    style={{ width: '140px', marginRight: '10px', fontSize: '14px' }}
                />
                <input
                    ref={lastInputRef}
                    type="text"
                    placeholder="Specjalizacja lekarza..."
                    value={searchTermDoctorSpecialization}
                    onChange={(event) => handleSearchChange(event, setSearchTermDoctorSpecialization)}
                    style={{ fontSize: '14px' }}
                />
            </div>
            <button onClick={handleSearch} style={{ marginBottom: '10px' }}>Wyszukaj</button>
            <div style={{ maxHeight: '300px', overflowY: 'scroll', overflowX: 'hidden' }}>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Imię pacjenta</th>
                            <th>Nazwisko pacjenta</th>
                            <th>PESEL pacjenta</th>
                            <th>Imię lekarza</th>
                            <th>Nazwisko lekarza</th>
                            <th>Specjalizacja lekarza</th>
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
                                <td>{row.doctorSpecialization}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScrollableTable;
