import extractFromRequest from "../utils/extractFromRequest.js";
import {userOwnsShift, userOwnsShiftRequest} from "../queries/shiftQueries.js";
import { userOwnsPayCycle } from "../queries/payCycleQueries.js";
import { userOwnsIncidentReport } from "../queries/incidentReportQueries.js";


export function isMyShift(pathFromRequestToShiftId) {
	const pathArray = pathFromRequestToShiftId.split(".");
	
	return async (request, response, next) => {
		const shiftId = extractFromRequest(request, pathArray);
		
		if(await userOwnsShift(request.user.id, shiftId)) return next();
		return response.status(403).send({ message: "shift must belong to you" });
	}
}


export function isMyShiftRequest(pathFromRequestToShiftRequestId) {
	const pathArray = pathFromRequestToShiftRequestId.split(".");
	
	return async (request, response, next) => {
		const shiftRequestId = extractFromRequest(request, pathArray);
		
		if(await userOwnsShiftRequest(request.user.id, shiftRequestId)) return next();
		return response.status(403).send({ message: "shift must belong to you" });
	}
}


export function isMyPayCycle(pathFromRequestToPayCycleId) {
	const pathArray = pathFromRequestToPayCycleId.split(".");
	
	return async (request, response, next) => {
		const payCycleId = extractFromRequest(request, pathArray);
		
		if(await userOwnsPayCycle(request.user.id, payCycleId)) return next();
		return response.status(403).send({ message: "pay cycle must belong to you" });
	}
}


export function isMyIncidentReport(pathFromRequestToIncidentReportId) {
	const pathArray = pathFromRequestToIncidentReportId.split(".");
	
	return async (request, response, next) => {
		const incidentReportId = extractFromRequest(request, pathArray);
		
		if(await userOwnsIncidentReport(request.user.id, incidentReportId)) return next();
		return response.status(403).send({ message: "incident report must belong to you" });
	}
}