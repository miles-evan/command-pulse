import extractFromRequest from "../utils/extractFromRequest.js";
import { Shift } from "../mongoose/schemas/shiftSchema.js";
import {userOwnsShift} from "../queries/shiftQueries.js";


export function isMyShift(pathFromRequestToShiftId) {
	const pathArray = pathFromRequestToShiftId.split(".");
	
	return async (request, response, next) => {
		const shiftId = extractFromRequest(request, pathArray);
		
		if(await userOwnsShift(request.user.id, shiftId)) return next();
		return response.status(403).send({ message: "shift must belong to you" });
	}
}