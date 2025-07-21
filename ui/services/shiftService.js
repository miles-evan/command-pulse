import BetterFetch from "../utils/BetterFetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/shifts"

// get my shifts
export const getMy = (date, time, dir, skip, limit) =>
	BetterFetch.get(rootURL, { date, time, dir, skip, limit });

// get all shifts
export const getAll = (startDate, endDate) =>
	BetterFetch.get(rootURL + "/all", { startDate, endDate });

// clock in
export const clockIn = shiftId =>
	BetterFetch.post(rootURL + `/${shiftId}/clock/in`);

// clock out
export const clockOut = shiftId =>
	BetterFetch.post(rootURL + `/${shiftId}/clock/out`);

// assign shift
export const assignShift = (date, startTime, endTime, location, payRate, userId=null) =>
	BetterFetch.post(rootURL + "/assign", { date, startTime, endTime, location, payRate, userId });

// reassign shift
export const reassignShift = (shiftId, userId) =>
	BetterFetch.post(rootURL + "/reassign", { shiftId, userId });

// update shift(s)
export const updateShifts = (shiftIds, updatedInfo) =>
	BetterFetch.put(rootURL, { shiftIds, updatedInfo });

// remove shift(s)
export const deleteShifts = shiftIds =>
	BetterFetch.delete(rootURL, { shiftIds });