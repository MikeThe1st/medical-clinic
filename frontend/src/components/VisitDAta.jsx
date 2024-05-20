import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/VisitsData.css"; // Importowanie pliku z stylami CSS

function VisitData() {
  const [appointmentId, setAppointmentId] = useState('');
  const [patientInfo, setPatientInfo] = useState('');
  const [treatmentInfo, setTreatmentInfo] = useState('');

  useEffect(() => {
    const fetchAppointmentId = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-appointment-id');
        setAppointmentId(response.data.appointmentId);
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
    
    try {
      const response = await axios.post('http://localhost:3000/save-patient-info', {
        appointmentId,
        patientInfo,
        treatmentInfo
      });

      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="visit-data-container">
      <h2 className="appointment-id">Appointment ID: {appointmentId}</h2>
      
      <section className="patient-info-section">
        <h3>Informacje o schorzeniach i dolegliwościach pacjenta</h3>
        <form onSubmit={handleSubmit} className="patient-info-form">
          <label className='text-white'>
            
            <textarea
              value={patientInfo}
              onChange={handlePatientInfoChange}
              placeholder="Wprowadź informacje o schorzeniach i dolegliwościach pacjenta"
              rows={10}
              cols={50}
              required
              className="patient-info-textarea"
            />
          </label>
          <label className='text-white'>
            Informacje o leczeniu:
            <textarea
              value={treatmentInfo}
              onChange={handleTreatmentInfoChange}
              placeholder="Wprowadź informacje o leczeniu"
              rows={10}
              cols={50}
              required
              className="patient-info-textarea"
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
