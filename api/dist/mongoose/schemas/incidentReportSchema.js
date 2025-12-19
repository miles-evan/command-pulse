import mongoose from "mongoose";
const incidentReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    shiftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    report: {
        type: String,
        default: null,
    },
});
incidentReportSchema.index({ dateCreated: 1 });
export const IncidentReport = mongoose.model("IncidentReport", incidentReportSchema);
