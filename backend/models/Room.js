import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        numberOfRoom: { type: Number, required: true },
        reservedDates: [
            {
                reservationId: { type: mongoose.Schema.Types.ObjectId, required: true },
                doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
                dateTime: { type: Date, required: true },
                isReserved: { type: Boolean, required: true, default: true }
            }
        ]
    }
)

const Room = mongoose.model("Room", RoomSchema)
export default Room
