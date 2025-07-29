import mongoose from "mongoose";

const incidentReportSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	shiftId: {
		type:  mongoose.Schema.Types.ObjectId,
		ref: "Shift",
		required: true
	},
	dateCreated: {
		type: String,
		required: true
	},
	report: {
		type: String,
		default: null
	}
});

incidentReportSchema.index({ dateCreated: 1 });

export const IncidentReport = mongoose.model("IncidentReport", incidentReportSchema);