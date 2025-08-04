import BetterFetch from "../utils/BetterFetch.js";
import { expandShiftDates } from "@/services/shiftService.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/pay-cycles";

// get someone else's pay cycle summary
export const getSummary = async (userId=null, startDate, endDate) => {
	const response = await BetterFetch.get(rootURL + (userId? `/${ userId }` : ""), {
		startDate: startDate.toISOString(), endDate: endDate.toISOString()
	});
	response.body.shifts?.forEach?.(expandShiftDates);
	return response;
}

// confirm payment sent
export const confirmSent = async (userId, startDate, endDate, payCycleId=null) =>
	await BetterFetch.post(rootURL + `/confirm-sent`, {
		userId, startDate: startDate.toISOString(), endDate: endDate.toISOString(), payCycleId
	});

// confirm payment received
export const confirmReceived = async payCycleId =>
	await BetterFetch.post(rootURL + `/confirm-received`, { payCycleId });

// revise hours worked
export const reviseHours = async (userId, startDate, endDate, payCycleId=null, hoursWorkedRevisions) =>
	await BetterFetch.post(rootURL + `/revise-hours`, {
		userId, startDate: startDate.toISOString(), endDate: endDate.toISOString(), payCycleId, hoursWorkedRevisions
	});