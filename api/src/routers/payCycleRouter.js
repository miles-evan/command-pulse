import { Router } from "express";
import { permission } from "../middleware/permission.js";
import {
	confirmPaymentReceived,
	confirmPaymentSent,
	getPayCycleSummary, reviseHours
} from "../queries/payCycleQueries.js";
import { payCyclePayedOrNot, paymentNotYetSentOrNull } from "../middleware/payCyclePermissions.js";
import { validateRequest } from "../middleware/validate.js";
import { getMyShiftsValidation } from "../validation/shiftValidation.js";
import {
	confirmPaymentReceivedValidation,
	confirmPaymentSentValidation,
	getMyPayCycleSummaryValidation,
	getSomeonesPayCycleSummaryValidation, reviseHoursValidation
} from "../validation/payCycleValidation.js";
import { sameCompanyAsUser } from "../middleware/sameCompanyAs.js";
import { isMyPayCycle } from "../middleware/isMy.js";
import { matchedData } from "express-validator";

const payCycleRouter = Router();

// --------------------------------


// Get my pay cycle summary
payCycleRouter.get(
	"/",
	...validateRequest(getMyPayCycleSummaryValidation),
	...permission("in company"),
	async (request, response) => {
		const { startDate, endDate } = matchedData(request);
		
		const result = await getPayCycleSummary(request.user.id, startDate, endDate);
		return response.send(result);
	}
);


// Get someone's pay cycle summary
payCycleRouter.get(
	"/:userId",
	...validateRequest(getSomeonesPayCycleSummaryValidation),
	...permission("supervisor"),
	sameCompanyAsUser("params.userId"),
	async (request, response) => {
		const { startDate, endDate } = matchedData(request);
		const { userId } = request.params;
		
		const result = await getPayCycleSummary(userId, startDate, endDate);
		return response.send(result);
	}
);


// Confirm payment sent
payCycleRouter.post(
	"/confirm-sent",
	...validateRequest(confirmPaymentSentValidation),
	...permission("supervisor"),
	sameCompanyAsUser("body.userId"),
	async (request, response) => {
		let { userId, startDate, endDate, payCycleId, paymentMethod="cash" } = matchedData(request);
		
		payCycleId = await confirmPaymentSent(userId, startDate, endDate, payCycleId, paymentMethod);
		return response.send({ payCycleId });
	}
);


// Confirm payment received
payCycleRouter.post(
	"/confirm-received",
	...validateRequest(confirmPaymentReceivedValidation),
	...permission("in company"),
	isMyPayCycle("body.payCycleId"),
	payCyclePayedOrNot("body.payCycleId"),
	async (request, response) => {
		let { payCycleId } = matchedData(request);
		
		await confirmPaymentReceived(payCycleId);
		return response.sendStatus(200);
	}
);


// Revise hours worked
payCycleRouter.post(
	"/revise-hours",
	...validateRequest(reviseHoursValidation),
	...permission("supervisor"),
	sameCompanyAsUser("body.userId"),
	paymentNotYetSentOrNull("body.payCycleId"),
	async (request, response) => {
		let { payCycleId, startDate, endDate, userId, hoursWorkedRevisions } = matchedData(request);
		
		payCycleId = await reviseHours(userId, startDate, endDate, payCycleId, hoursWorkedRevisions);
		return response.send({ payCycleId });
	}
);


// --------------------------------

export default payCycleRouter;