import BetterFetch from "../utils/BetterFetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/incident-reports"


// initialize incident
export const init = shiftId =>
	BetterFetch.post(rootURL + "/init", { shiftId });

// generate / revise incident report
export const generate = (incidentReportId, incidentInfo) =>
	BetterFetch.post(rootURL + "/generate", { incidentReportId, incidentInfo });

// get my incidents
export const getMy = (skip, limit) =>
	BetterFetch.get(rootURL, { skip, limit });

// get all incidents
export const getAll = (skip, limit) =>
	BetterFetch.get(rootURL + "/all", { skip, limit });

// get incident report
export const getReport = incidentReportId =>
	BetterFetch.get(rootURL + `/${incidentReportId}`);

// delete incident report
export const deleteIncident = incidentReportId  =>
	BetterFetch.delete(rootURL, { incidentReportId });
