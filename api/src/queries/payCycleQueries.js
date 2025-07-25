import { PayCycle } from "../mongoose/schemas/payCycleSchema.js"
import { getShiftsInDateRange } from "./shiftQueries.js";
import { compareTimes } from "../utils/dateUtils.js";
import mongoose from "mongoose";


export async function getPayCycleSummary(userId, startDate, endDate) {
	const shifts = await getShiftsInDateRange(userId, startDate, endDate);
	const payCycle = await getPayCycle(userId, startDate, endDate);
	
	const { summary, cleanedPayCycle  } = await computeSummary(shifts, payCycle);
	
	// pull hoursWorkedRevisions out of cleanedPayCycle
	let { hoursWorkedRevisions, ...projectedPayCycle } = cleanedPayCycle ?? {};
	if(!payCycle) projectedPayCycle = null;
	
	return { ...summary, payCycle: projectedPayCycle, shifts };
}


// computes totals and also cleans payCycle object
async function computeSummary(shifts, payCycle) {
	const redundancies = {};
	
	const revisionsMap = {};
	for(const revision of payCycle?.hoursWorkedRevisions ?? []) {
		revisionsMap[revision.shiftId.toString()] = revision.hoursWorked;
	}
	
	// compute summary
	const summary = { totalHoursWorked: 0, totalHoursWorkedRevised: 0, totalEarning: 0, totalEarningRevised: 0 };
	for (const shift of shifts) {
		shift.hoursWorked = shift.clockInTime? compareTimes(shift.endTime, shift.startTime) : 0;
		summary.totalHoursWorked += shift.hoursWorked;
		summary.totalEarning += shift.hoursWorked * shift.payRate;
		
		const shiftId = shift.shiftId.toString();
		if (revisionsMap[shiftId] === shift.hoursWorked) {
			delete revisionsMap[shiftId];
			redundancies[shiftId] = true;
		}
		
		shift.hoursWorkedRevised = revisionsMap[shiftId] ?? null;
		const revised = shift.hoursWorkedRevised ?? shift.hoursWorked;
		summary.totalHoursWorkedRevised += revised;
		summary.totalEarningRevised += revised * shift.payRate;
	}
	
	// clean payCycle
	await PayCycle.findByIdAndUpdate(
		payCycle?.payCycleId,
		{ $pull: {
			hoursWorkedRevisions: {
				shiftId: { $in: Object.keys(redundancies) }
			}
		}}
	);
	const cleanedPayCycle = await getPayCycleById(payCycle?.payCycleId);
	
	return { summary, cleanedPayCycle };
}


async function getPayCycle(userId, startDate, endDate) {
	const [payCycle=null] = await PayCycle.aggregate([
		{ $match: { userId: new mongoose.Types.ObjectId(userId), startDate, endDate } },
		{ $project: {
			_id: 0, payCycleId: "$_id", hoursWorkedRevisions: 1, paymentSent: 1, paymentReceived: 1, paymentMethod: 1
		}}
	]);
	
	return payCycle;
}


// this is just so other files don't interact with the database directly
export async function getPayCycleById(payCycleId) {
	const payCycle = await PayCycle.findById(payCycleId).lean();
	if(!payCycle) return null;
	const { _id, ...rest } = payCycle;
	return { payCycleId: _id.toString(), ...rest }
}


// --------------------------------


// either give (userId, startDate, and endDate) OR give (payCycleId)
export async function confirmPaymentSent(userId, startDate, endDate, payCycleId=null, paymentMethod="cash") {
	if(!payCycleId) payCycleId = await createPayCycle(userId, startDate, endDate);
	await PayCycle.findByIdAndUpdate(payCycleId, { paymentSent: true, paymentMethod: paymentMethod });
	return payCycleId
}


export async function confirmPaymentReceived(payCycleId) {
	await PayCycle.findByIdAndUpdate(payCycleId, { paymentReceived: true });
}


// --------------------------------


// either give (userId, startDate, and endDate) OR give (payCycleId)
// overrides and replaces current revisions
export async function reviseHours(userId, startDate, endDate, payCycleId=null, hoursWorkedRevisions) {
	if(!payCycleId) payCycleId = await createPayCycle(userId, startDate, endDate);
	await PayCycle.findByIdAndUpdate(payCycleId, { $set: { hoursWorkedRevisions: hoursWorkedRevisions } });
	return payCycleId;
}


export async function createPayCycle(userId, startDate, endDate) {
	const newPayCycle = new PayCycle({ userId, startDate, endDate });
	await newPayCycle.save();
	return newPayCycle.id;
}