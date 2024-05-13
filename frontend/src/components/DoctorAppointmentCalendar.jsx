import React, { useState, useEffect } from "react";
import "../css/DocCalendar.css";
import { useLocation } from 'react-router-dom'
import axios from "axios";


const DoctorAppointmentCalendar = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [appointments, setAppointments] = useState(undefined);
    const [doctor, setDoctor] = useState(undefined);
    const [email, setEmail] = useState('');
    const [room, setRoom] = useState('');
    const [description, setDescription] = useState('');

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('id')

    useEffect(() => {
        const getDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/backend/doctor/${query}`);
                setDoctor(response.data);
                setAppointments(response.data.workingDates);
            } catch (error) {
                console.error("Error fetching doctor data:", error);
            }
        }

        getDoctor()
    }, []);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setSelectedTime(null)
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleBookAppointment = () => {
        if (selectedDay && selectedTime) {
            alert(selectedDay)
            alert(selectedTime)
            setSelectedDay(null);
            setSelectedTime(null);
        }
    };

    const renderDays = () => {
        const days = [];
        for (let i = 1; i <= 31; i++) {
            const day = `2024-08-${String(i).padStart(2, "0")}`;
            const dayAppointments = appointments[day] || {};
            const isAvailable = Object.values(dayAppointments).some(
                (value) => value === true
            );
            const hasAvailableSlot =
                Object.values(dayAppointments).filter((value) => value === false)
                    .length < 5;
            const hasNoAvailableSlot = Object.values(dayAppointments).every(
                (value) => value === false
            );

            let buttonClass = "calendar-day";
            if (isAvailable) {
                buttonClass += " available";
            } else if (hasAvailableSlot) {
                buttonClass += " limited";
            } else {
                buttonClass += " booked";
            }

            if (hasNoAvailableSlot) {
                buttonClass += " unavailable";
            }

            days.push(
                <button
                    key={i}
                    className={buttonClass}
                    onClick={() => handleDayClick(day)}
                    disabled={!isAvailable && !hasAvailableSlot}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    const renderTimes = (day) => {
        const dayAppointments = appointments[day] || {};
        const availableTimes = Object.keys(dayAppointments).filter(
            (time) => dayAppointments[time] === true
        );

        return availableTimes.map((time, index) => (
            <button
                key={index}
                className="text-center mx-auto"
                onClick={() => handleTimeClick(time)}
            >
                {time}
            </button>
        ));
    };

    return (
        <div className="calendar-container">
            {doctor && (
                <>
                    <div className="doctor-info">
                        <h2>
                            Reserve visit with Doctor {doctor.name} {doctor.lastName}
                        </h2>
                        <p>Type: {doctor.type}</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="calendar-month">
                        <h3 className="hh3">August 2024</h3>
                        <div className="calendar-days">{renderDays()}</div>
                    </div>
                    {selectedDay && (
                        <div className="calendar-time-selector">
                            <h3 className="hh3">Select a time for {selectedDay}</h3>
                            <div className="calendar-times">{renderTimes(selectedDay)}</div>
                            <button className="book-button" onClick={handleBookAppointment}>
                                Book
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default DoctorAppointmentCalendar;
