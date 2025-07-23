import { Router } from "express";
import { permission } from "../middleware/permission.js";
import {
	confirmPaymentReceived,
	confirmPaymentSent,
	getPayCycleSummary, reviseHours
} from "../queries/payCycleQueries.js";
import { payCyclePermissions, paymentNotYetSent } from "../middleware/payCyclePermissions.js";
import { validateRequest } from "../middleware/validate.js";
import { getMyShiftsValidation } from "../validation/shiftValidation.js";
import {
	confirmPaymentReceivedValidation,
	confirmPaymentSentValidation,
	getMyPayCycleSummaryValidation,
	getSomeonesPayCycleSummaryValidation, reviseHoursValidation
} from "../validation/payCycleValidation.js";

const payCycleRouter = Router();

// --------------------------------


// Get my pay cycle summary
payCycleRouter.get(
	"/",
	...validateRequest(getMyPayCycleSummaryValidation),
	...permission("in company"),
	async (request, response) => {
		const { startDate, endDate } = request.query;
		
		const result = await getPayCycleSummary(request.user.id, startDate, endDate);
		return response.send(result);
	}
);


// Get someone's pay cycle summary
payCycleRouter.get(
	"/:userId",
	...validateRequest(getSomeonesPayCycleSummaryValidation),
	...permission("supervisor"),
	async (request, response) => {
		const { startDate, endDate } = request.query;
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
	async (request, response) => {
		let { userId, startDate, endDate, payCycleId } = request.body;
		
		payCycleId = await confirmPaymentSent(userId, startDate, endDate, payCycleId);
		return response.send({ payCycleId });
	}
);


// Confirm payment received
payCycleRouter.post(
	"/confirm-received",
	...validateRequest(confirmPaymentReceivedValidation),
	...permission("supervisor"),
	payCyclePermissions("body.payCycleId"),
	async (request, response) => {
		let { payCycleId } = request.body;
		
		await confirmPaymentReceived(payCycleId);
		return response.sendStatus(200);
	}
);


// Revise hours worked
payCycleRouter.post(
	"/revise-hours",
	...validateRequest(reviseHoursValidation),
	...permission("supervisor"),
	paymentNotYetSent("body.payCycleId"),
	async (request, response) => {
		let { payCycleId, startDate, endDate, userId, hoursWorkedRevisions } = request.body;
		
		payCycleId = await reviseHours(userId, startDate, endDate, payCycleId, hoursWorkedRevisions);
		return response.send({ payCycleId });
	}
);


// --------------------------------

export default payCycleRouter;