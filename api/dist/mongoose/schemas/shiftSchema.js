import mongoose from "mongoose";
const shiftSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    shiftStart: {
        type: Date,
        required: true
    },
    shiftEnd: {
        type: Date,
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
        type: Date,
        default: null
    },
    clockOutTime: {
        type: Date,
        default: null
    }
});
export const Shift = mongoose.model("Shift", shiftSchema);
