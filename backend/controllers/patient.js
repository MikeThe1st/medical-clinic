import Doctor from "../models/Doctor.js"
import Patient from "../models/Patient.js"
import Room from "../models/Room.js"
import mongoose from "mongoose"

export const addPatient = async (req, res) => {
    try {
        const { name, lastName, city, postalCode, street, propertyNumber, apartmentNumber, pesel, birthDate, gender, email, phoneNumber } = req.body

        const emailUser = await Patient.findOne({ email: email })
        if (emailUser) {
            return res.status(403).json({ msg: `User with email: ${email} already exists.` })
        }
        const peselUser = await Patient.findOne({ pesel: pesel })
        if (peselUser) {
            return res.status(403).json({ msg: `User with pesel: ${pesel} already exists.` })
        }

        const newUser = new Patient({ name, lastName, location: { city, postalCode, street, propertyNumber, apartmentNumber }, pesel, birthDate, gender, email, phoneNumber })
        await newUser.save()

        return res.status(200).json(newUser)
    } catch (error) {
        console.error('Registration failed:', error)
        return res.status(500).json({ error: 'Registration failed.' })
    }
}

export const searchPatients = async (req, res) => {
    try {
        const {
            searchFirstName: name,
            searchLastName: lastName,
            searchPesel: pesel,
            searchCity: city,
            searchStreet: street,
            searchPhoneNumber: phoneNumber,
            searchEmail: email
        } = req.body;
        let query = {};
        let searchCriteria = [];

        if (name) {
            searchCriteria.push({ name: { $regex: `^${name}`, $options: 'i' } });
        }
        if (lastName) {
            searchCriteria.push({ lastName: { $regex: `^${lastName}`, $options: 'i' } });
        }
        if (pesel) {
            searchCriteria.push({ pesel: { $regex: `^${pesel}`, $options: 'i' } });
        }
        if (city) {
            searchCriteria.push({ 'location.city': { $regex: `^${city}`, $options: 'i' } });
        }
        if (email) {
            searchCriteria.push({ email: { $regex: `^${email}`, $options: 'i' } });
        }
        if (phoneNumber) {
            searchCriteria.push({ phoneNumber: { $regex: `^${phoneNumber}`, $options: 'm' } });
        }
        if (street) {
            searchCriteria.push({ 'location.street': { $regex: `^${street}`, $options: 'i' } });
        }

        if (searchCriteria.length > 0) {
            query = { $and: searchCriteria }
        }

        console.log(query, searchCriteria)
        const patients = await Patient.find(query).select('-password')

        return res.status(200).json(patients)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const editPatient = async (req, res) => {
    try {
        const { userData, query } = req.body
        const { email, pesel } = userData

        const emailPatient = await Patient.findOne({ email: email, _id: { $ne: query } })
        if (emailPatient) {
            return res.status(403).json({ msg: `Email: ${email} already exists for another user.` });
        }
        const peselPatient = await Patient.findOne({ pesel: pesel, _id: { $ne: query } })
        if (peselPatient) {
            return res.status(403).json({ msg: `PESEL: ${pesel} already exists for another user.` });
        }

        const updatedUser = await Patient.findOneAndUpdate({ _id: query }, userData, { new: true })

        return res.status(201).json(updatedUser)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const reserveVisit = async (req, res) => {
    try {
        const { query: doctorId, room, email: patientEmail, selectedYear, selectedMonth, selectedDay, selectedTime, description } = req.body

        // Checking if doctor and patient exist
        const doctor = await Doctor.findOne({ _id: doctorId })
        if (!doctor) {
            return res.status(404).json({ msg: `Doktor z id:${doctorId} nie istnieje.` });
        }
        const patient = await Patient.findOne({ email: patientEmail })
        if (!patient) {
            return res.status(403).json({ msg: `Pacjent z mailem: ${patientEmail} nie istnieje.` });
        }

        const newReservationId = new mongoose.Types.ObjectId()

        // Checking if date and room are still available
        const dateKey = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`
        const formattedDate = new Date(`${dateKey} ${selectedTime}`)
        if (doctor.workingDates.has(dateKey)) {
            const times = doctor.workingDates.get(dateKey);
            console.log(times)
            if (times[selectedTime]) {
                const foundRoom = await Room.findOne({ 'reservedDates.dateTime': formattedDate, numberOfRoom: room })
                console.log(foundRoom)
                if (!foundRoom) {
                    const newReservation = {
                        reservationId: newReservationId,
                        doctorId: doctorId,
                        dateTime: formattedDate,
                        status: "Zarejestrowana",
                        description,
                        patientCondition: null,
                        treatment: null
                    }
                    patient.reservations.push(newReservation)

                    times[selectedTime] = false;
                    doctor.workingDates.set(dateKey, times);

                    const updatedRoom = await Room.findOneAndUpdate(
                        { numberOfRoom: room },
                        {
                            $push: {
                                'reservedDates': {
                                    reservationId: newReservationId,
                                    doctorId: doctorId,
                                    dateTime: formattedDate
                                }
                            }
                        },
                        { new: true }
                    )
                    console.log(updatedRoom.reservedDates)
                }
            }
            else {
                return res.status(409).json({ msg: `Termin ${formattedDate} jest już zarezerwowany.` });
            }
        } else {
            return res.status(403).json({ msg: `Brak danych dla ${dateKey}.` });
        }

        await patient.save()
        await doctor.save()

        return res.status(201).json({ msg: `Rezerwacja id: ${newReservationId} została zapisana.` })
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const getAllReservations = async (req, res) => {
    try {
        const patients = await Patient.find()

        // Collect all doctorIds and reservationIds
        let doctorIds = [];
        let reservationIds = [];

        patients.forEach(patient => {
            patient.reservations.forEach(reservation => {
                doctorIds.push(reservation.doctorId);
                reservationIds.push(reservation.reservationId.toString());
            });
        });

        // Fetch all doctors
        const doctors = await Doctor.find({ _id: { $in: doctorIds } })
        const doctorsMap = doctors.reduce((acc, doctor) => {
            acc[doctor._id] = doctor;
            return acc;
        }, {});

        // Fetch all rooms
        const rooms = await Room.find({ 'reservedDates.reservationId': { $in: reservationIds } })
        let roomMap = {};
        rooms.forEach(room => {
            room.reservedDates.forEach(reservedDate => {
                if (reservationIds.includes(reservedDate.reservationId.toString())) {
                    roomMap[reservedDate.reservationId] = room.numberOfRoom;
                }
            });
        });

        // console.log(roomMap)

        // Combine data
        const visitData = [];
        patients.forEach(patient => {
            patient.reservations.forEach(reservation => {
                const doctor = doctorsMap[reservation.doctorId];
                const roomNumber = roomMap[reservation.reservationId] || 'N/A';

                visitData.push({
                    patientFirstName: patient.name,
                    patientLastName: patient.lastName,
                    patientPESEL: patient.pesel,
                    doctorFirstName: doctor.name,
                    doctorLastName: doctor.lastName,
                    doctorSpecialization: doctor.type,
                    doctorStatus: reservation.status,
                    visitDay: reservation.dateTime.toLocaleDateString('pl-PL'),
                    hours: reservation.dateTime.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
                    roomNumber
                });
            });
        });

        return res.status(200).json(visitData)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}