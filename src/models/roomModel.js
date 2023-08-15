import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomCode: {
        type: String,
        required: [true, "Code is required"],
        unique: true
    },
    publicID: {
        type: String,
        required: [true, "PublicID is required"],
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
})

const Room = mongoose.models.rooms || mongoose.model("rooms", roomSchema);

export default Room;