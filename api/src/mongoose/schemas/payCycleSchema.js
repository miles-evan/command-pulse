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
	hoursWorkedRevisions: {
		type: [{
			shiftId: mongoose.Schema.Types.ObjectId,
			hoursWorked: Number
		}],
		default: []
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

payCycleSchema.index({ userId: 1, startDate: 1, endDate: 1 }, { unique: true });

export const PayCycle = mongoose.model("PayCycle", payCycleSchema);