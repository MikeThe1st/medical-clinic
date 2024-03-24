import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const DoctorAppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Smith');
  const [selectedPatient, setSelectedPatient] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleAppointmentSubmit = () => {
    // Here you can handle the submission of the appointment data
    const appointment = {
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      doctor: selectedDoctor,
      patient: selectedPatient,
    };
    console.log('New appointment:', appointment);
    // You can perform further actions like sending data to a server, etc.
  };

  return (
    <div className="calendar">
      <h2 className="calendar-title">Doctor's Appointment Calendar</h2>
      <div>
        <p>Select Date:</p>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <p>Select Time:</p>
        <TimePicker value={selectedTime} onChange={handleTimeChange} />
      </div>
      <div>
        <p>Select Doctor:</p>
        <select value={selectedDoctor} onChange={handleDoctorChange}>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
          {/* Add more doctors as needed */}
        </select>
      </div>
      <div>
        <p>Patient Name:</p>
        <input type="text" value={selectedPatient} onChange={handlePatientChange} />
      </div>
      <button onClick={handleAppointmentSubmit}>Schedule Appointment</button>
    </div>
  );
};

export default DoctorAppointmentCalendar;
