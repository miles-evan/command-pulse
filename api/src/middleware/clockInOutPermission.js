import extractFromRequest from "../utils/extractFromRequest.js";
import { hasClockedIn, hasClockedOut, isShiftToday } from "../queries/shiftQueries.js";


export function clockInOutPermission(pathFromRequestToShiftId, pathFromRequestToInOrOut) {
	const shiftIdPathArray = pathFromRequestToShiftId.split(".");
	const inOrOutPathArray = pathFromRequestToInOrOut.split(".");
	
	return async (request, response, next) => {
		const shiftId = extractFromRequest(request, shiftIdPathArray);
		const inOrOut = extractFromRequest(request, inOrOutPathArray);
		
		if(!await isShiftToday(shiftId))
			return response.status(403).send({ message: "shift must be today" });
		
		if(inOrOut === "out" && !await hasClockedIn(shiftId))
			return response.status(403).send({ message: "must clock in before clocking out" });
		
		if(inOrOut === "in" && await hasClockedIn(shiftId))
			return response.status(403).send({ message: "already clocked in" });
		
		if(inOrOut === "out" && await hasClockedOut(shiftId))
			return response.status(403).send({ message: "already clocked out" });
		
		return next();
	}
}