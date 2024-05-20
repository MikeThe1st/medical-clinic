import mongoose, { Mongoose } from 'mongoose'
const Schema = mongoose.Schema

const timeSlotSchema = new Schema({
    "08:00": { type: Boolean },
    "09:00": { type: Boolean },
    "10:00": { type: Boolean },
    "11:00": { type: Boolean },
    "12:00": { type: Boolean },
    "13:00": { type: Boolean },
    "14:00": { type: Boolean },
    "15:00": { type: Boolean },
}, { _id: false })

const doctorSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    type: { type: String, required: true },
    rating: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    workingDates: {
        type: Map,
        of: timeSlotSchema
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema)
export default Doctor
