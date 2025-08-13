import mongoose from "mongoose";

const shiftRequestSchema = new mongoose.Schema({
	shiftId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Shift",
		required: true,
		unique: true,
	},
	message: {
		type: String,
		default: "Shift request",
	},
	isCover: {
		type: Boolean,
		required: true,
	},
	timeSent: {
		type: Date,
		default: Date.now,
	},
});

export const ShiftRequest = mongoose.model("ShiftRequest", shiftRequestSchema);