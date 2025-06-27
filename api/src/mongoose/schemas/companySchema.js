import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    supervisorInviteCode: {
        type: String,
        required: true,
        unique: true
    },
    officerInviteCode: {
        type: String,
        required: true,
        unique: true
    },
    currentPayCycleDates: {
        type: {
            startDate: Date,
            endDate: Date,
            payDay: Date
        },
        default: null
    },
    supervisorIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    officerIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    shiftRequestIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShiftRequest"
        }],
        default: []
    },
    announcementIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }],
        default: []
    },
    conversationIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation"
        }],
        default: []
    }
});

export const Company = mongoose.model("Company", companySchema);