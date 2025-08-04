import BetterFetch from "../utils/BetterFetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/shifts"

// get my shifts
export const getMy = (date, dir, skip, limit) =>
	BetterFetch.get(rootURL, { date: date.toISOString(), dir, skip, limit });

// get all shifts
export const getAll = (startDate, endDate) =>
	BetterFetch.get(rootURL + "/all", { startDate: startDate.toISOString(), endDate: endDate.toISOString() });

// clock in
export const clockIn = shiftId =>
	BetterFetch.post(rootURL + `/${shiftId}/clock/in`);

// clock out
export const clockOut = shiftId =>
	BetterFetch.post(rootURL + `/${shiftId}/clock/out`);

// assign shift
export const assignShift = (shiftStart, shiftEnd, location, payRate, userId=null) =>
	BetterFetch.post(rootURL + "/assign", {
		shiftStart: shiftStart.toISOString(),
		shiftEnd: shiftEnd.toISOString(),
		location,
		payRate,
		userId
	});

// reassign shift
export const reassignShift = (shiftId, userId) =>
	BetterFetch.post(rootURL + "/reassign", { shiftId, userId });

// update shift(s)
export const updateShifts = (shiftIds, updatedInfo) => {
	if("shiftStart" in updatedInfo)
		updatedInfo.shiftStart = updatedInfo.shiftStart.toISOString();
	if("shiftEnd" in updatedInfo)
		updatedInfo.shiftEnd = updatedInfo.shiftEnd.toISOString();
	return BetterFetch.put(rootURL, { shiftIds, updatedInfo });
}

// remove shift(s)
export const deleteShifts = shiftIds =>
	BetterFetch.delete(rootURL, { shiftIds });