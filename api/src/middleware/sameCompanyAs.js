import { usersInSameCompany } from "../queries/userQueries.js";
import {userInSameCompanyAsShift, userInSameCompanyAsShiftRequest} from "../queries/shiftQueries.js";
import extractFromRequest from "../utils/extractFromRequest.js";


export function sameCompanyAsUser(pathFromRequestToUserId) {
	const pathArray = pathFromRequestToUserId.split(".");
	
	return async (request, response, next) => {
		const userId = extractFromRequest(request, pathArray);
		if(!userId) return next();
		
		if(await usersInSameCompany(request.user.id, userId)) return next();
		return response.status(403).send({ message: "must be in the same company as user" });
	}
}


export function sameCompanyAsShifts(pathFromRequestToShiftIds) {
	const pathArray = pathFromRequestToShiftIds.split(".");
	
	return async (request, response, next) => {
		const shiftIds = extractFromRequest(request, pathArray);
		
		for(const shiftId of shiftIds) {
			if(!await userInSameCompanyAsShift(request.user.id, shiftId))
				return response.status(403).send({message: "must be in the same company as shifts"});
		}
		
		return next();
	}
}


export function sameCompanyAsShift(pathFromRequestToShiftId) {
	const pathArray = pathFromRequestToShiftId.split(".");
	
	return async (request, response, next) => {
		const shiftId = extractFromRequest(request, pathArray);
		if(!shiftId) return next();
		
		if(await userInSameCompanyAsShift(request.user.id, shiftId)) return next();
		return response.status(403).send({ message: "must be in the same company as shift" });
	}
}


export function sameCompanyAsShiftRequest(pathFromRequestToShiftRequestId) {
	const pathArray = pathFromRequestToShiftRequestId.split(".");
	
	return async (request, response, next) => {
		const shiftRequestId = extractFromRequest(request, pathArray);
		
		if(await userInSameCompanyAsShiftRequest(request.user.id, shiftRequestId)) return next();
		return response.status(403).send({ message: "must be in the same company as shift" });
	}
}