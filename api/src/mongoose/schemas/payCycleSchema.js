import mongoose from "mongoose";

const payCycleSchema = new mongoose.Schema({
	userId: {
		type:  mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	startDate: {
		type: String,
		required: true
	},
	endDate: {
		type: String,
		required: true
	},
	revisedHoursDifference: {
		type: Number,
		default: 0
	},
	paymentSent: {
		type: Boolean,
		default: false
	},
	paymentReceived: {
		type: Boolean,
		default: false
	},
	paymentMethod: {
		type: String,
		default: "cash"
	}
});

export const PayCycle = mongoose.model("PayCycle", payCycleSchema);