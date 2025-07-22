import { PayCycle } from "../mongoose/schemas/payCycleSchema.js"
import { getShiftsInDateRange } from "./shiftQueries.js";
import { compareTimes } from "../utils/dateUtils.js";


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
	
	const [payCycle] = await PayCycle.aggregate([
		{ $match: { userId, startDate, endDate } },
		{ $project: {
			_id: 0, payCycleId: "$_id", revisedHoursDifference: 1, paymentSent: 1, paymentReceived: 1, paymentMethod: 1
		}}
	]);
	
	return {
		hoursWorked: totalHoursWorked,
		totalEarning,
		averagePayRate: totalHoursWorked === 0? 0 : totalEarning / totalHoursWorked,
		payCycle
	}
}