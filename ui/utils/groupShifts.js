import { labelKeysAndValues, groupBy, sortObjectByKeys } from "./objectUtils.js";


// turns shifts into [{ locationName, shifts }, ...]
export function groupShiftsByLocation(shifts) {
	const groupedShifts = groupBy(shifts, shift => shift.location);
	const groupedAndSortedShifts = sortObjectByKeys(groupedShifts);
	return labelKeysAndValues(groupedAndSortedShifts, "locationName", "shifts");
}


// turns shifts into [{ date, shifts }, ...]
export function groupShiftsByDate(shifts) {
	const groupedShifts = groupBy(shifts, shift => shift.shiftStart.toDateString());
	const groupedAndSortedShifts = sortObjectByKeys(groupedShifts, (a, b) => new Date(a) - new Date(b));
	const labeledShifts = labelKeysAndValues(groupedAndSortedShifts, "date", "shifts");
	return labeledShifts.map(shiftDay => ({ date: new Date(shiftDay.date), shifts: shiftDay.shifts }));
}
