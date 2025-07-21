import { labelKeysAndValues, groupBy, sortObjectByKeys } from "./objectUtils.js";


// turns shifts into [{ locationName, shifts }, ...]
export function groupShiftsByLocation(shifts) {
	const groupedShifts = groupBy(shifts, shift => shift.location);
	const groupedAndSortedShifts = sortObjectByKeys(groupedShifts);
	return labelKeysAndValues(groupedAndSortedShifts, "locationName", "shifts");
}


// turns shifts into [{ date, shifts }, ...]
export function groupShiftsByDate(shifts) {
	const groupedShifts = groupBy(shifts, shift => shift.date);
	const groupedAndSortedShifts = sortObjectByKeys(groupedShifts);
	return labelKeysAndValues(groupedAndSortedShifts, "date", "shifts");
}
