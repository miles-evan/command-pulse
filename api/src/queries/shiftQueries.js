import { Shift } from "../mongoose/schemas/shiftSchema.js";
import { User } from "../mongoose/schemas/userSchema.js";
import { ShiftRequest } from "../mongoose/schemas/shiftRequestSchema.js";
import {Company} from "../mongoose/schemas/companySchema.js";


export async function createAndAssignShift(
    date,
    startTime,
    endTime,
    location,
    payRate,
    userId,
    shiftRequestMessage,
    companyId
) {
    const newShift = new Shift({ date, startTime, endTime, location, payRate, userId });
    await newShift.save();

    if(userId) {
        await assignShift(userId, newShift.id);
    } else {
        await createShiftRequest(newShift.id, shiftRequestMessage, false, companyId);
    }

    return newShift;
}


export async function reassignShift(shiftId, userId, shiftRequestMessage, companyId) {
    const shift = await Shift.findById(shiftId);

    // remove connections
    if(shift.userId)
        await unassignShift(shift.userId, shiftId);
    const shiftRequest = await ShiftRequest.findOne({ shiftId: shiftId });
    if(shiftRequest)
        await deleteShiftRequest(shiftRequest.id);

    // add connections
    if(userId) {
        await assignShift(userId, shiftId);
    } else {
        await createShiftRequest(shiftId, shiftRequestMessage, false, companyId);
    }
}


async function assignShift(userId, shiftId) {
    await User.findByIdAndUpdate(userId, { $addToSet: { shiftIds: shiftId } });
    await Shift.findByIdAndUpdate(shiftId, { $set: { userId: userId } });
}


async function unassignShift(userId, shiftId) {
    await User.findByIdAndUpdate(userId, { $pull: { shiftIds: shiftId } });
    await Shift.findByIdAndUpdate(shiftId, { $set: { userId: null } });
}


async function createShiftRequest(shiftId, message="", isCover, companyId) {
    const newShiftRequest = new ShiftRequest({ shiftId, message, isCover });
    await newShiftRequest.save();

    await Company.findByIdAndUpdate(companyId, { $addToSet: { shiftRequestIds: newShiftRequest.id } });

    return newShiftRequest;
}


async function deleteShiftRequest(shiftRequestId) {
    await Company.updateOne({ shiftRequestIds: shiftRequestId }, { $pull: { shiftRequestIds: shiftRequestId } });
    await ShiftRequest.findByIdAndDelete(shiftRequestId);
}


export async function userInSameCompanyAsShift(userId, shiftId) {
    const user = await User.findById(userId);
    const shift = await Shift.findById(shiftId);

    if(shift.userId) {
        const shiftsUser = await User.findById(shift.userId);
        return user.companyId.equals(shiftsUser.companyId);
    } else {
        const shiftRequest = await ShiftRequest.findOne({ shiftId: shiftId });
        const company = await Company.findOne({ shiftRequestIds: shiftRequest.id });
        return user.companyId.equals(company.id);
    }
}