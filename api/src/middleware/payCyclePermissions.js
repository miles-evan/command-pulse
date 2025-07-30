import extractFromRequest from "../utils/extractFromRequest.js";
import { getPayCycleById } from "../queries/payCycleQueries.js";


// ensures either the payment was not sent yet OR no payCycleId was given
export function paymentNotYetSentOrNull(pathFromRequestToPayCycleId) {
	const payCycleIdPathArray = pathFromRequestToPayCycleId.split(".");
	
	return async (request, response, next) => {
		const payCycleId = extractFromRequest(request, payCycleIdPathArray);
		if(payCycleId === null) return next();
		await payCyclePayedOrNot(pathFromRequestToPayCycleId, false)(request, response, next);
	}
}


// checks whether the payment was sent or not
export function payCyclePayedOrNot(pathFromRequestToPayCycleId, paymentSent=true) {
	const payCycleIdPathArray = pathFromRequestToPayCycleId.split(".");
	
	return async (request, response, next) => {
		const payCycleId = extractFromRequest(request, payCycleIdPathArray);
		
		const payCycle = await getPayCycleById(payCycleId);
		if(payCycle.paymentSent !== paymentSent)
			return response.status(403).send({ message: `payment must ${paymentSent? "" : "not "}have been sent` });
		
		return next();
	}
}