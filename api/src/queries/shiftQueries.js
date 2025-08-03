import { Shift } from "../mongoose/schemas/shiftSchema.js";
import { User } from "../mongoose/schemas/userSchema.js";
import { ShiftRequest } from "../mongoose/schemas/shiftRequestSchema.js";
import { Company } from "../mongoose/schemas/companySchema.js";


export async function createAndAssignShift(
	shiftStart, shiftEnd, location, payRate, userId, shiftRequestMessage, companyId
) {
	const newShift = new Shift({ shiftStart, shiftEnd, location, payRate, userId });
	await newShift.save();
	
	if(userId) {
		await assignShift(newShift.id, userId);
	} else {
		await createShiftRequest(newShift.id, shiftRequestMessage, false, companyId);
	}
	
	return newShift;
}


export async function acceptShiftRequest(userId, shiftRequestId) {
	const { shiftId } = await ShiftRequest.findById(shiftRequestId);
	
	await reassignShift(shiftId, userId);
	
	return shiftId;
}


export async function reassignShift(shiftId, userId, shiftRequestMessage, companyId) {
	// remove connections
	await removeAllShiftConnections(shiftId);
	
	// add connections
	if(userId) {
		await assignShift(shiftId, userId);
	} else {
		await createShiftRequest(shiftId, shiftRequestMessage, false, companyId);
	}
}


export async function deleteAndUnassignShifts(shiftIds) {
	await Promise.all(
		shiftIds.map(async shiftId => {
			await removeAllShiftConnections(shiftId);
			await Shift.findByIdAndDelete(shiftId);
		})
	);
}


async function removeAllShiftConnections(shiftId) {
	const shift = await Shift.findById(shiftId);
	
	if(shift.userId)
		await unassignShift(shift.userId, shiftId);
	
	const shiftRequest = await ShiftRequest.findOne({ shiftId: shiftId });
	if(shiftRequest)
		await deleteShiftRequest(shiftRequest.id);
}


async function assignShift(shiftId, userId) {
	await User.findByIdAndUpdate(userId, { $addToSet: { shiftIds: shiftId } });
	await Shift.findByIdAndUpdate(shiftId, { $set: { userId: userId } });
}


async function unassignShift(userId, shiftId) {
	await User.findByIdAndUpdate(userId, { $pull: { shiftIds: shiftId } });
	await Shift.findByIdAndUpdate(shiftId, { $set: { userId: null } });
}


export async function createShiftRequest(shiftId, message="", isCover, companyId) {
	const newShiftRequest = new ShiftRequest({ shiftId, message, isCover });
	await newShiftRequest.save();
	
	await Company.findByIdAndUpdate(companyId, { $addToSet: { shiftRequestIds: newShiftRequest.id } });
	
	return newShiftRequest;
}


export async function deleteShiftRequest(shiftRequestId) {
	await Company.updateOne({ shiftRequestIds: shiftRequestId }, { $pull: { shiftRequestIds: shiftRequestId } });
	await ShiftRequest.findByIdAndDelete(shiftRequestId);
}


// --------------------------------


// gets shifts based on Date object, filtered and sorted by shiftEnd (exclusive)
export async function getShifts(userId, date, dir=1, skip=0, limit=20) {
	const user = await User.findById(userId);
	
	const shifts = await Shift.find({
		_id: { $in: user.shiftIds },
		shiftEnd: { [dir === 1? "$gt" : "$lt"]: date },
	}).sort({ shiftEnd: dir }).skip(skip).limit(limit);
	
	return projectShifts(shifts);
}


// gets shifts between date objects based on shiftStart (inclusive, exclusive)
export async function getShiftsInDateRange(userId, startDate, endDate) {
	const user = await User.findById(userId);
	const shifts = await Shift.find({ _id: { $in: user.shiftIds }, shiftStart: { $gte: startDate, $lt: endDate } });
	return projectShifts(shifts);
}


// gets shifts in company between date objects based on shiftStart (inclusive, exclusive)
export async function getAllShifts(companyId, startDate, endDate) {
	const shifts = [];
	
	const company = await Company.findById(companyId);
	
	const users = await User.find({ $or: [
		{ _id: { $in: company.supervisorIds } },
		{ _id: { $in: company.officerIds } },
	] });
	
	(await Promise.all(
		users.map(user => Shift.find({
			_id: { $in: user.shiftIds },
			shiftStart: { $gte: startDate, $lt: endDate },
		}))
	)).forEach(arr => shifts.push(...arr));
	
	const shiftRequests = await ShiftRequest.find({
		_id: { $in: company.shiftRequestIds },
		isCover: false,
	});
	
	shifts.push(...(await Promise.all(shiftRequests.map(async shiftRequest => {
		const shift = await Shift.findById(shiftRequest.shiftId);
		return shift.shiftStart >= startDate && shift.shiftStart < endDate? [shift] : [];
	}))).flat());

	return projectShifts(shifts);
}


export async function projectShifts(shifts) {
	const userIds = [...new Set(shifts.map(shift => shift.userId))];
	const users = await User.find({ _id: { $in: userIds } });
	const names = {};
	users.forEach(user => names[user.id] = { firstName: user.firstName, lastName: user.lastName });
	
	return shifts.map(shift => ({
		shiftId: shift.id,
		userId: shift.userId,
		firstName: names[shift.userId].firstName,
		lastName: names[shift.userId].lastName,
		shiftStart: shift.shiftStart,
		shiftEnd: shift.shiftEnd,
		location: shift.location,
		payRate: shift.payRate,
		clockInTime: shift.clockInTime,
		clockOutTime: shift.clockOutTime
	}));
}


// --------------------------------


export async function updateShiftInfos(shiftIds, updatedInfo) {
	await Shift.updateMany({ _id: { $in: shiftIds } }, updatedInfo);
}


// this is so that other files don't use the Shift object like this
export async function updateShiftInfo(shiftId, updatedInfo) {
	await Shift.findByIdAndUpdate(shiftId, updatedInfo);
}


export async function clockIn(shiftId) {
	await Shift.findByIdAndUpdate(shiftId, { clockInTime: new Date() });
}


export async function clockOut(shiftId) {
	await Shift.findByIdAndUpdate(shiftId, { clockOutTime: new Date() });
}


// --------------------------------


export async function userInSameCompanyAsShiftRequest(userId, shiftRequestId) {
	const user = await User.findById(userId);
	const company = await Company.findOne({ shiftRequestIds: shiftRequestId });
	return user.companyId.equals(company.id);
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


export async function userOwnsShiftRequest(userId, shiftRequestId) {
	const { shiftId } = await ShiftRequest.findById(shiftRequestId);
	return userOwnsShift(userId, shiftId);
}


export async function userOwnsShift(userId, shiftId) {
	const user = await User.findOne({ _id: userId, shiftIds: shiftId });
	return !!user;
}


export async function isShiftToday(shiftId) {
	const shift = await Shift.findById(shiftId);
	const today = new Date().toDateString();
	return shift.shiftStart.toDateString() === today || shift.shiftEnd.toDateString() === today;
}


export async function hasClockedIn(shiftId) {
	const shift = await Shift.findById(shiftId);
	return shift.clockInTime !== null;
}

export async function hasClockedOut(shiftId) {
	const shift = await Shift.findById(shiftId);
	return shift.clockOutTime !== null;
}