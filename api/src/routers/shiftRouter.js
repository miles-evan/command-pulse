import { Router } from "express";
import { permission } from "../middleware/permission.js";
import {sameCompanyAsShift, sameCompanyAsUser} from "../middleware/sameCompanyAs.js";
import {
	createAndAssignShift,
	createShiftRequest,
	getAllShifts,
	getShifts,
	reassignShift
} from "../queries/shiftQueries.js";
import {isMyShift} from "../middleware/isMy.js";

const shiftRouter = Router();

// --------------------------------


// Create and assign (or shift request) shift
shiftRouter.post(
	"/assign",
	...permission("supervisor"),
	sameCompanyAsUser("body.userId"),
	async (request, response) => {
		const { date, startTime, endTime, location, payRate, userId, shiftRequestMessage } = request.body;
		
		try {
			const newShift = await createAndAssignShift(
				date, startTime, endTime, location, payRate, userId, shiftRequestMessage, request.user.companyId
			);
			return response.status(201).send({ shiftId: newShift.id });
		} catch ({ message }) {
			return response.status(400).send({ message });
		}
	}
);


// Reassign / unassign (shift request) shift
shiftRouter.post(
	"/reassign",
	...permission("supervisor"),
	sameCompanyAsShift("body.shiftId"),
	sameCompanyAsUser("body.userId"),
	async (request, response) => {
		const { shiftId, userId, shiftRequestMessage } = request.body;
		
		await reassignShift(shiftId, userId, shiftRequestMessage, request.user.companyId)
		return response.sendStatus(200);
	}
);


// Get all shifts
shiftRouter.get(
	"/all",
	...permission("supervisor"),
	async (request, response) => {
		const { startDate, endDate } = request.query;
		
		const shifts = await getAllShifts(request.user.companyId, startDate, endDate);
		response.send({ shifts });
	}
);

// Get my shifts
shiftRouter.get(
	"/",
	...permission("in company"),
	async (request, response) => {
		const { date, dir, skip, limit } = request.query;
		
		const shifts = await getShifts(request.user.id, date, Number(dir), Number(skip), Number(limit));
		response.send({ shifts });
	}
);


// Get someone's shifts
shiftRouter.get(
	"/users/:userId",
	...permission("supervisor"),
	async (request, response) => {
		const {
			params: { userId },
			query: { date, dir, skip, limit }
		} = request;
		
		const shifts = await getShifts(userId, date, Number(dir), Number(skip), Number(limit));
		response.send({ shifts });
	}
);


// Make cover request
shiftRouter.post(
	"/requests/add/:shiftId",
	...permission("in company"),
	isMyShift("params.shiftId"),
	async (request, response) => {
		const {
			params: { shiftId },
			body: { message }
		} = request;
		
		try {
			const newShiftRequest = await createShiftRequest(shiftId, message, true, request.user.companyId);
			response.status(201).send({ shiftRequestId: newShiftRequest.id });
		} catch ({ message }) {
			return response.status(400).send({ message });
		}
	}
);


// --------------------------------

export default shiftRouter;