import { Shift } from "../mongoose/schemas/shiftSchema.js";
import { User } from "../mongoose/schemas/userSchema.js";
import { ShiftRequest } from "../mongoose/schemas/shiftRequestSchema.js";
import { Company } from "../mongoose/schemas/companySchema.js";
import extractFromRequest from "../utils/extractFromRequest.js";


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


export async function createShiftRequest(shiftId, message="", isCover, companyId) {
	const newShiftRequest = new ShiftRequest({ shiftId, message, isCover });
	await newShiftRequest.save();
	
	await Company.findByIdAndUpdate(companyId, { $addToSet: { shiftRequestIds: newShiftRequest.id } });
	
	return newShiftRequest;
}


async function deleteShiftRequest(shiftRequestId) {
	await Company.updateOne({ shiftRequestIds: shiftRequestId }, { $pull: { shiftRequestIds: shiftRequestId } });
	await ShiftRequest.findByIdAndDelete(shiftRequestId);
}


// --------------------------------


export async function getShifts(userId, date, dir=1, skip=0, limit=20) {
	
	const user = await User.findById(userId);
	
	const shifts = await Shift.find({
		_id: { $in: user.shiftIds },
		date: dir === 1? { $gte: date } : { $lte: date }
	})
		.sort({ date: dir, startTime: dir })
		.skip(skip)
		.limit(limit);
	
	return projectShifts(shifts);
}


export async function getAllShifts(companyId, startDate="0000-00-00", endDate="9999-99-99") {
	const shifts = [];
	
	const company = await Company.findById(companyId);
	
	const users = await User.find(
		{ $or: [
			{ _id: { $in: company.supervisorIds } },
			{ _id: { $in: company.officerIds } }
		] }
	);
	
	(await Promise.all(
		users.map(user => Shift.find({
			_id: { $in: user.shiftIds },
			date: { $gte: startDate, $lte: endDate }
		}))
	)).forEach(arr => shifts.push(...arr));
	
	const shiftRequests = await ShiftRequest.find({
		_id: { $in: company.shiftRequestIds },
		date: { $gte: startDate, $lte: endDate },
		isCover: false
	});
	
	shifts.push(...await Promise.all(shiftRequests.map(shiftRequest => Shift.findById(shiftRequest.shiftId))));
	
	sortShifts(shifts);
	return projectShifts(shifts);
}


function sortShifts(shifts) {
	shifts.sort((a, b) => {
		if (a.date < b.date) return -1;
		if (a.date > b.date) return 1;
		
		if (a.startTime < b.startTime) return -1;
		if (a.startTime > b.startTime) return 1;
		
		return 0;
	});
}


async function projectShifts(shifts) {
	const userIds = [...new Set(shifts.map(shift => shift.userId))];
	const users = await User.find({ _id: { $in: userIds } });
	const names = {};
	users.forEach(user => names[user.id] = { firstName: user.firstName, lastName: user.lastName });
	
	return shifts.map(shift => ({
		shiftId: shift.id,
		firstName: names[shift.userId].firstName,
		lastName: names[shift.userId].lastName,
		date: shift.date,
		startTime: shift.startTime,
		endTime: shift.endTime,
		location: shift.location,
		payRate: shift.payRate,
		clockInTime: shift.clockInTime,
		clockOutTime: shift.clockOutTime
	}));
}


// --------------------------------


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


export async function userOwnsShift(userId, shiftId) {
	const shift = await Shift.findById(shiftId);
	return shift.userId.equals(userId);
}