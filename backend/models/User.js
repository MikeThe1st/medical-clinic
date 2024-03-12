import mongoose from 'mongoose'

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
        isAdmin: { type: Boolean, default: false }
    }
)

const User = mongoose.model("User", UserSchema)
export default User
