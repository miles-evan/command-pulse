import BetterFetch from "../utils/BetterFetch.js";
import { API_URL } from "@/constants/apiUrl.js";


const rootURL = API_URL + "/shifts";

// assign shift
export const assignShift = (shiftStart, shiftEnd, location, payRate, userId=null) =>
	BetterFetch.post(rootURL + "/assign", {
		shiftStart: shiftStart.toISOString(), shiftEnd: shiftEnd.toISOString(), location, payRate, userId
	});

// reassign shift
export const reassignShift = (shiftId, userId) =>
	BetterFetch.post(rootURL + "/reassign", { shiftId, userId });

// get my shifts
export const getMy = async (date, dir, skip, limit, sortBy="shiftEnd") => {
	const response = await BetterFetch.get(rootURL, { date: date.toISOString(), dir, skip, limit, sortBy });
	response.body.shifts?.forEach?.(expandShiftDates);
	return response;
};

// get all shifts
export const getAll = async (startDate, endDate) => {
	const response =
		await BetterFetch.get(rootURL + "/all", { startDate: startDate.toISOString(), endDate: endDate.toISOString() });
	response.body.shifts?.forEach?.(expandShiftDates);
	return response;
};

// clock in
export const clockIn = shiftId =>
	BetterFetch.post(rootURL + `/${shiftId}/clock/in`);

// clock out
export const clockOut = shiftId =>
	BetterFetch.post(rootURL + `/${shiftId}/clock/out`);

// update shift(s)
export const updateShifts = (shiftIds, updatedInfo) => {
	serializeUpdatedInfoDates(updatedInfo);
	return BetterFetch.put(rootURL, { shiftIds, updatedInfo });
}

// remove shift(s)
export const deleteShifts = shiftIds =>
	BetterFetch.delete(rootURL, { shiftIds });

// make cover request
export const makeCoverRequest = (shiftId, message) =>
	BetterFetch.post(rootURL + `/requests/add/${shiftId}`, message? { message } : {});

// delete cover request
export const deleteCoverRequest = shiftRequestId  =>
	BetterFetch.delete(rootURL + `/requests/${shiftRequestId}`);

// accept shift request
export const acceptShiftRequest = shiftRequestId  =>
	BetterFetch.post(rootURL + `/requests/${shiftRequestId}/accept`);

// get shift requests
export const getShiftRequests = async (startDate, endDate) => {
	const response = await BetterFetch.get(rootURL + "/requests", {
		startDate: startDate.toISOString(), endDate: endDate.toISOString()
	});
	response.body.shiftRequests?.forEach((shiftRequest) => {
		expandShiftDates(shiftRequest.shift);
		shiftRequest.timeSent = new Date(shiftRequest.timeSent);
	});
	return response;
}


// -------------------------------- Helper functions:


export function expandShiftDates(shift) {
	shift.shiftStart = new Date(shift.shiftStart);
	shift.shiftEnd = new Date(shift.shiftEnd);
	if(shift.clockInTime) shift.clockInTime = new Date(shift.clockInTime);
	if(shift.clockOutTime) shift.clockOutTime = new Date(shift.clockOutTime);
}


function serializeUpdatedInfoDates(updatedInfo) {
	if("shiftStart" in updatedInfo)
		updatedInfo.shiftStart = updatedInfo.shiftStart.toISOString();
	if("shiftEnd" in updatedInfo)
		updatedInfo.shiftEnd = updatedInfo.shiftEnd.toISOString();
	if("clockInTime" in updatedInfo)
		updatedInfo.clockInTime = updatedInfo.clockInTime.toISOString();
	if("clockOutTime" in updatedInfo)
		updatedInfo.clockOutTime = updatedInfo.clockOutTime.toISOString();
}