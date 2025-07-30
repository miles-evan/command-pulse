import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: null
    },
    isSupervisor: {
        type: Boolean,
        default: false
    },
    shiftIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shift"
        }],
        default: () => []
    },
    payCycleIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PayCycle"
        }],
        default: () => []
    },
    incidentReportIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "IncidentReport"
        }],
        default: () => []
    }
});

export const User = mongoose.model("User", userSchema);