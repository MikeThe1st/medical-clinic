import Doctor from "../models/Doctor.js"
import User from "../models/User.js"

export const getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ type: { $exists: true } }).select('-password')

        return res.status(200).json(doctors)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}


export const getDoctor = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await User.findOne({ _id: id })

        if (!doctor) {
            return res.status(404).json({ msg: `Doctor with id:${id} not found.` })
        }

        return res.status(200).json(doctor)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}

export const addDoctorWorkingDate = async (req, res) => {
    try {
        const { id, selectedYear, selectedMonth, selectedDay, selectedHour } = req.body
        const doctor = await User.findOne({ _id: id })

        if (!doctor) {
            return res.status(404).json({ msg: `Doctor with id:${id} not found.` })
        }

        const dateKey = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`;
        const updateQuery = {
            $set: {
                [`workingDates.${dateKey}.${selectedHour}`]: true
            }
        }
        const updatedDoctor = await User.updateOne({ _id: id }, updateQuery)
        console.log(updatedDoctor)


        return res.status(201).json(updatedDoctor)
    } catch (error) {
        console.error('Update failed:', error);
        return res.status(500).json({ error: 'Update failed.' });
    }
}