import extractFromRequest from "../utils/extractFromRequest.js";
import {userOwnsShift, userOwnsShiftRequest} from "../queries/shiftQueries.js";


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