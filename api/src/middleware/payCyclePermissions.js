import extractFromRequest from "../utils/extractFromRequest.js";
import { getPayCycleById } from "../queries/payCycleQueries.js";


export function paymentNotYetSent(pathFromRequestToPayCycleId) {
	const payCycleIdPathArray = pathFromRequestToPayCycleId.split(".");
	
	return async (request, response, next) => {
		const payCycleId = extractFromRequest(request, payCycleIdPathArray);
		if(payCycleId === null) return next();
		await payCyclePermissions(pathFromRequestToPayCycleId, false)(request, response, next);
	}
}


export function payCyclePermissions(pathFromRequestToPayCycleId, paymentSent=true) {
	const payCycleIdPathArray = pathFromRequestToPayCycleId.split(".");
	
	return async (request, response, next) => {
		const payCycleId = extractFromRequest(request, payCycleIdPathArray);
		
		const payCycle = await getPayCycleById(payCycleId);
		console.log(payCycle)
		if(payCycle.paymentSent !== paymentSent)
			return response.status(403).send({ message: `payment must ${paymentSent? "" : "not "}have been sent` });
		
		return next();
	}
}