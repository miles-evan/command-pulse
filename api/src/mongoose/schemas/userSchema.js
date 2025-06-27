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
    shiftIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shift"
        }],
        default: []
    },
    payCycleIds: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PayCycle"
        }],
        default: []
    },
    isSupervisor: {
        type: Boolean,
        default: false
    }
});

export const User = mongoose.model("User", userSchema);