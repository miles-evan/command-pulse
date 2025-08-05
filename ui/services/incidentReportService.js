import BetterFetch from "../utils/BetterFetch.js";
import { expandShiftDates } from "@/services/shiftService.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/incident-reports"


// initialize incident
export const init = shiftId =>
	BetterFetch.post(rootURL + "/init", { shiftId });

// generate / revise incident report
export const generate = (incidentReportId, incidentInfo) =>
	BetterFetch.post(rootURL + "/generate", { incidentReportId, incidentInfo });

// get my incidents
export const getMy = async (skip, limit) => {
	const response = await BetterFetch.get(rootURL, { skip, limit });
	response.body.incidents?.forEach?.(expandIncidentDates);
	return response;
}

// get all incidents
export const getAll = async (skip, limit) => {
	const response = await BetterFetch.get(rootURL + "/all", { skip, limit });
	response.body.incidents?.forEach?.(expandIncidentDates);
	return response;
}

// get incident report
export const getReport = incidentReportId =>
	BetterFetch.get(rootURL + `/${incidentReportId}`);

// delete incident report
export const deleteIncident = incidentReportId  =>
	BetterFetch.delete(rootURL, { incidentReportId });


// -------------------------------- Helper functions:


export function expandIncidentDates(incident) {
	incident.dateCreated = new Date(incident.dateCreated);
	incident.shift.date = new Date(incident.shift.date);
}
