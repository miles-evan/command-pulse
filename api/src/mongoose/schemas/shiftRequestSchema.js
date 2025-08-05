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
	}
});

export const ShiftRequest = mongoose.model("ShiftRequest", shiftRequestSchema);