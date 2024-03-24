import Doctor from "../models/Doctor.js"

export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select('-password')

        return res.status(200).json(doctors)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}


export const getDoctor = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await Doctor.findOne({ _id: id })

        if (!doctor) {
            return res.status(404).json({ msg: `Doctor with id:${id} not found.` })
        }

        return res.status(200).json(doctor)
    } catch (error) {
        console.error('Display failed:', error);
        return res.status(500).json({ error: 'Display failed.' });
    }
}