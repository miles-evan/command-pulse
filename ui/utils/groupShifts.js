import { labelKeysAndValues, groupBy, sortObjectByKeys } from "./objectUtils.js";


// turns shifts into [{ locationName, shifts }, ...]
export function groupShiftsByLocation(shifts) {
	const groupedShifts = groupBy(shifts, shift => shift.location);
	const groupedAndSortedShifts = sortObjectByKeys(groupedShifts);
	return labelKeysAndValues(groupedAndSortedShifts, "locationName", "shifts");
}


// turns shifts into [{ date, shifts }, ...]
export function groupShiftsByDate(shifts) {
	const groupedShifts = groupBy(shifts, shift => shift.shiftStart.getTime());
	const groupedAndSortedShifts = sortObjectByKeys(groupedShifts);
	const labeledShifts = labelKeysAndValues(groupedAndSortedShifts, "date", "shifts");
	return labeledShifts.map(shiftDay => ({ date: new Date(Number(shiftDay.date)), shifts: shiftDay.shifts }));
}
