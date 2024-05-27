import mongoose from 'mongoose'

const timeSlotSchema = new mongoose.Schema({
    "08:00": { type: Boolean },
    "09:00": { type: Boolean },
    "10:00": { type: Boolean },
    "11:00": { type: Boolean },
    "12:00": { type: Boolean },
    "13:00": { type: Boolean },
    "14:00": { type: Boolean },
    "15:00": { type: Boolean },
}, { _id: false })


const UserSchema = new mongoose.Schema(
    {
        login: { type: String, required: true, unique: true },
        password: { type: String, required: true, min: 5 },
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
        isAdmin: { type: Boolean, default: false },
        resetPassword: { type: Boolean, default: false },
        previousPasswords: [String],
        disabled: { type: Boolean, default: false },
        rights: [String],
        type: { type: String, required: true },
        rating: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        workingDates: {
            type: Map,
            of: timeSlotSchema
        }
    }
)

const User = mongoose.model("User", UserSchema)
export default User
