import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomCode: {
        type: String,
        required: [true, "Code is required"],
        unique: true
    }
})

const Room = mongoose.models.rooms || mongoose.model("rooms", roomSchema);

export default Room;