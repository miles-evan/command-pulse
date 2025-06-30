import mongoose from "mongoose";

const shiftRequestSchema = new mongoose.Schema({
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isCover: {
        type: Boolean,
        required: true
    }
});

export const ShiftRequest = mongoose.model("ShiftRequest", shiftRequestSchema);