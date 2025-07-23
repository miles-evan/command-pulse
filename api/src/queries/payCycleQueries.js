import { PayCycle } from "../mongoose/schemas/payCycleSchema.js"
import { getShiftsInDateRange } from "./shiftQueries.js";
import { compareTimes } from "../utils/dateUtils.js";
import mongoose from "mongoose";


export async function getPayCycleSummary(userId, startDate, endDate) {
	const shifts = await getShiftsInDateRange(userId, startDate, endDate);
	
	const { totalHoursWorked, totalEarning } = shifts.reduce(
		(acc, shift) => {
			const hoursWorked = compareTimes(shift.endTime, shift.startTime);
			acc.totalHoursWorked += hoursWorked;
			acc.totalEarning += hoursWorked * shift.payRate;
			return acc;
		},
		{ totalHoursWorked: 0, totalEarning: 0 }
	);
	
	return {
		hoursWorked: totalHoursWorked,
		totalEarning,
		averagePayRate: totalHoursWorked === 0? 0 : totalEarning / totalHoursWorked
	}
}


export async function getPayCycle(userId, startDate, endDate) {
	const [payCycle=null] = await PayCycle.aggregate([
		{ $match: { userId: new mongoose.Types.ObjectId(userId), startDate, endDate } },
		{ $project: {
			_id: 0, payCycleId: "$_id", revisedHoursDifference: 1, paymentSent: 1, paymentReceived: 1, paymentMethod: 1
		}}
	]);
	
	return payCycle;
}


export async function getPayCycleById(payCycleId) {
	return PayCycle.findById(payCycleId);
}


// either give userId, startDate, and endDate OR give payCycleId
export async function confirmPaymentSent(userId, startDate, endDate, payCycleId=null) {
	if(!payCycleId) payCycleId = await createPayCycle(userId, startDate, endDate);
	await PayCycle.findByIdAndUpdate(payCycleId, { paymentSent: true });
	return payCycleId
}


export async function confirmPaymentReceived(payCycleId) {
	await PayCycle.findByIdAndUpdate(payCycleId, { paymentReceived: true });
}


// either give userId, startDate, and endDate OR give payCycleId
export async function reviseHours(userId, startDate, endDate, payCycleId=null, hoursWorkedRevisions) {
	if(!payCycleId) payCycleId = await createPayCycle(userId, startDate, endDate);
	await PayCycle.findByIdAndUpdate(payCycleId, { hoursWorkedRevisions: hoursWorkedRevisions });
}


export async function createPayCycle(userId, startDate, endDate) {
	const newPayCycle = new PayCycle({ userId, startDate, endDate });
	await newPayCycle.save();
	return newPayCycle.id;
}