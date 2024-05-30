import mongoose from 'mongoose'

const PatientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        location: {
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            street: { type: String },
            propertyNumber: { type: String, required: true },
            apartmentNumber: { type: String },
        },
        pesel: { type: String, required: true },
        birthDate: { type: Date, required: true },
        gender: { type: String, required: true, enum: ["W", "M"] },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        reservations: [{
            reservationId: { type: mongoose.Schema.Types.ObjectId, required: true },
            doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
            dateTime: { type: Date, required: true },
            status: { type: String, required: true },
            description: { type: String },
            patientCondition: { type: String },
            treatment: { type: String },
        },
        { timestamps: true }
        ],
    }
)

const Patient = mongoose.model("Patient", PatientSchema)
export default Patient
