import * as fetch from "../utils/fetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/shifts"

// get my shifts
export const getMy = (date, time, dir, skip, limit) =>
	fetch.get(rootURL, { date, time, dir, skip, limit });

// get all shifts
export const getAll = (startDate, endDate) =>
	fetch.get(rootURL + "/all", { startDate, endDate });

// clock in
export const clockIn = shiftId =>
	fetch.post(rootURL + `/${shiftId}/clock/in`);

// clock out
export const clockOut = shiftId =>
	fetch.post(rootURL + `/${shiftId}/clock/out`);

// update shift(s)
export const updateShifts = (shiftIds, updatedInfo) =>
	fetch.put(rootURL, { shiftIds, updatedInfo });

// reassign shift
export const reassignShift = (shiftId, userId) =>
	fetch.post(rootURL + "/reassign", { shiftId, userId });