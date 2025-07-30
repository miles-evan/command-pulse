import { isMyIncidentReport } from "./isMy.js";


// checks that user is either a supervisor OR owns
export function isMyIncidentReportOrImSupervisor(pathFromRequestToIncidentReportId) {
	return async (request, response, next) => {
		if(request.user.isSupervisor) return next();
		await isMyIncidentReport(pathFromRequestToIncidentReportId)(request, response, next);
	}
}