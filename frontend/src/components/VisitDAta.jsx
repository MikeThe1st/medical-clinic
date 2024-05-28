import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/VisitsData.css"; // Importowanie pliku z stylami CSS
import { useLocation } from 'react-router-dom'

function VisitData() {
  const [reservation, setReservation] = useState('');
  const [patientInfo, setPatientInfo] = useState('');
  const [treatmentInfo, setTreatmentInfo] = useState('');

  const location = useLocation();
  let query = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchAppointmentId = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/backend/patient/reservation/${query}`);
        console.log(response.data)
        setReservation(response.data);
      } catch (error) {
        console.error('Error fetching appointment id:', error);
      }
    };

    fetchAppointmentId();
  }, []);

  const handlePatientInfoChange = (event) => {
    setPatientInfo(event.target.value);
  };

  const handleTreatmentInfoChange = (event) => {
    setTreatmentInfo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (reservation?.treatment || reservation?.patientCondition) return
    try {
      const appointmentId = reservation?.reservationId
      const response = await axios.post('http://localhost:3000/backend/patient/post-treatment', {
        appointmentId,
        patientInfo,
        treatmentInfo
      });

      console.log(response);
      console.log('Data submitted successfully:', response.data);
      alert(response.data.msg);
      window.location.reload()
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="visit-data-container">
      <h2 className="appointment-id">Appointment ID: {reservation?.reservationId}</h2>

      <section className="patient-info-section">
        <h3>Informacje o schorzeniach i dolegliwościach pacjenta</h3>
        <form onSubmit={handleSubmit} className="patient-info-form">
          <label className='text-white'>

            <textarea
              value={reservation?.patientCondition || patientInfo}
              onChange={handlePatientInfoChange}
              placeholder="Wprowadź informacje o schorzeniach i dolegliwościach pacjenta"
              rows={10}
              cols={50}
              required
              className="patient-info-textarea"
              disabled={reservation?.patientCondition}
            />
          </label>
          <label className='text-white'>
            Informacje o leczeniu:
            <textarea
              value={reservation?.treatment || treatmentInfo}
              onChange={handleTreatmentInfoChange}
              placeholder="Wprowadź informacje o leczeniu"
              rows={10}
              cols={50}
              required
              className="patient-info-textarea"
              disabled={reservation?.treatment}
            />
          </label>
          <br />
          <button type="submit" className="submit-button">Submit</button>
          <div> <button onClick={() => { window.location.href = '/appointment-list' }}> Powrót do Wizyt </button></div>
        </form>
      </section>
    </div>
  );
}

export default VisitData;
