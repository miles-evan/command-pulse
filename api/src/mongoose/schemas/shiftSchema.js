import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    payRate: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    clockInTime: {
        type: String,
        default: null
    },
    clockOutTime: {
        type: String,
        default: null
    }
});

export const Shift = mongoose.model("Shift", shiftSchema);