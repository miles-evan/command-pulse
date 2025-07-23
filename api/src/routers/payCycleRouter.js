import { Router } from "express";
import { permission } from "../middleware/permission.js";
import {
	confirmPaymentReceived,
	confirmPaymentSent,
	getPayCycle,
	getPayCycleSummary, reviseHours
} from "../queries/payCycleQueries.js";
import { payCyclePermissions, paymentNotYetSent } from "../middleware/payCyclePermissions.js";

const payCycleRouter = Router();

// --------------------------------


// Get my pay cycle summary
payCycleRouter.get(
	"/",
	...permission("in company"),
	async (request, response) => {
		const { startDate, endDate } = request.query;
		
		const { hoursWorked, totalEarning, averagePayRate } = await getPayCycleSummary(request.user.id, startDate, endDate);
		const payCycle = await getPayCycle(request.user.id, startDate, endDate);
		return response.send({ hoursWorked, totalEarning, averagePayRate, payCycle });
	}
);


// Get someone's pay cycle summary
payCycleRouter.get(
	"/:userId",
	...permission("supervisor"),
	async (request, response) => {
		const { startDate, endDate } = request.query;
		const { userId } = request.params;
		
		const { hoursWorked, totalEarning, averagePayRate } = await getPayCycleSummary(userId, startDate, endDate);
		const payCycle = await getPayCycle(userId, startDate, endDate);
		return response.send({ hoursWorked, totalEarning, averagePayRate, payCycle });
	}
);


// Confirm payment sent
payCycleRouter.post(
	"/confirm-sent",
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
	...permission("supervisor"),
	paymentNotYetSent("body.payCycleId"),
	async (request, response) => {
		const { payCycleId, startDate, endDate, userId, hoursWorkedRevisions } = request.body;
		
		await reviseHours(userId, startDate, endDate, payCycleId, hoursWorkedRevisions);
		return response.sendStatus(200);
	}
);


// --------------------------------

export default payCycleRouter;