
// turns shifts into [{ locationName, shifts }, ...]
export function groupShiftsByLocation(shifts) {
	const groupedShifts = groupBy(shifts, shift => shift.location);
	const groupedAndSortedShifts = sortObjectByKeys(groupedShifts);
	return labelKeysAndValues(groupedAndSortedShifts, "locationName", "shifts");
}


export function groupShiftsByDate(shifts) {
	const groupedShifts = groupBy(shifts, shift => shift.date);
	const groupedAndSortedShifts = sortObjectByKeys(groupedShifts);
	return labelKeysAndValues(groupedAndSortedShifts, "date", "shifts");
}


// --------------------------------


// turns an array into an object with keys being the category and values being and array of all elements of arr in the category
function groupBy(arr, getCategory) {
	const result = {};
	arr.forEach(item => {
		const key = getCategory(item);
		if(!result[key]) result[key] = [];
		result[key].push(item);
	});
	return result;
}


//  { z: 1, y: 2, x: 3 } -> [{ x: 3 }, { y: 2 }, { z: 1 }]
function sortObjectByKeys(obj, compare) {
	return Object.keys(obj)
		.sort(compare)
		.map(key => ({ [key]: obj[key] }));
}


// arr should be an array of objects with only one key-value pair each
function labelKeysAndValues(arr, keyName, valueName) {
	return arr.map(obj => labelKeyAndValue(obj, keyName, valueName));
}


// labelKeyAndValue({ Miles: 20 }, "name", "age") -> { name: "Miles", age: 20 }
function labelKeyAndValue(obj, keyName, valueName) {
	const [key, value] = Object.entries(obj)[0];
	return { [keyName]: key, [valueName]: value };
}
