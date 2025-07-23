import extractFromRequest from "../utils/extractFromRequest.js";
import { getPayCycleById } from "../queries/payCycleQueries.js";

export function paymentReceivedConfirmationPermission(pathFromRequestToPayCycleId) {
	const payCycleIdPathArray = pathFromRequestToPayCycleId.split(".");
	
	return async (request, response, next) => {
		const payCycleId = extractFromRequest(request, payCycleIdPathArray);
		
		const payCycle = await getPayCycleById(payCycleId);
		
		if(!payCycle.paymentSent)
			return response.status(403).send({ message: "cannot confirm that you received a payment that has not been set yet" });
		
		return next();
	}
}