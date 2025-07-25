import BetterFetch from "../utils/BetterFetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/pay-cycles";

// get someone else's pay cycle summary
export const getSummary = async (userId=null, startDate, endDate) =>
	await BetterFetch.get(rootURL + (userId? `/${userId}` : ""), { startDate, endDate });

// confirm payment sent
export const confirmSent = async (userId, startDate, endDate, payCycleId=null) =>
	await BetterFetch.post(rootURL + `/confirm-sent`, { userId, startDate, endDate, payCycleId });

// confirm payment received
export const confirmReceived = async payCycleId =>
	await BetterFetch.post(rootURL + `/confirm-received`, { payCycleId });

// revise hours worked
export const reviseHours = async (userId, startDate, endDate, payCycleId=null, hoursWorkedRevisions) =>
	await BetterFetch.post(rootURL + `/revise-hours`, { userId, startDate, endDate, payCycleId, hoursWorkedRevisions });