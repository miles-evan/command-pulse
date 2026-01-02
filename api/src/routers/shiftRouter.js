import { Router } from "express";
import { permission } from "../middleware/permission.js";
import {
	sameCompanyAsShift, sameCompanyAsShiftRequest, sameCompanyAsShifts, sameCompanyAsUser
} from "../middleware/sameCompanyAs.js";
import {
	acceptShiftRequest,
	clockIn,
	clockOut,
	createAndAssignShift,
	createShiftRequest,
	deleteAndUnassignShifts,
	deleteShiftRequest,
	getAllShifts, getShiftRequests,
	getShifts,
	reassignShift,
	updateShiftInfo,
	updateShiftInfos
} from "../queries/shiftQueries.js";
import { isMyShift, isMyShiftRequest } from "../middleware/isMy.js";
import { clockInOutPermission } from "../middleware/clockInOutPermission.js";
import { validateRequest } from "../middleware/validate.js";
import {
	acceptShiftRequestValidation,
	clockInOutValidation,
	createAssignShiftValidation,
	deleteCoverRequestValidation,
	deleteUnassignShiftsValidation,
	getAllShiftsValidation,
	getMyShiftsValidation,
	getShiftRequestsValidation,
	getSomeonesShiftsValidation,
	makeCoverRequestValidation,
	reassignShiftValidation,
	updateShiftInfoValidation
} from "../validation/shiftValidation.js";
import { matchedData } from "express-validator";

const shiftRouter = Router();

// --------------------------------


// Create and assign (or shift request) shift
shiftRouter.post(
	"/assign",
	...validateRequest(createAssignShiftValidation),
	...permission("supervisor"),
	sameCompanyAsUser("body.userId"),
	async (request, response) => {
		const { shiftStart, shiftEnd, location, payRate, userId, shiftRequestMessage } = request.body;
		
		try {
			const newShift = await createAndAssignShift(
				shiftStart, shiftEnd, location, payRate, userId,
				shiftRequestMessage, request.user.companyId, request.user.id
			);
			return response.status(201).send({ shiftId: newShift.id });
		} catch ({ message }) {
			return response.status(400).send({ message });
		}
	}
);


// Reassign / shift request shift
shiftRouter.post(
	"/reassign",
	...validateRequest(reassignShiftValidation),
	...permission("supervisor"),
	sameCompanyAsShift("body.shiftId"),
	sameCompanyAsUser("body.userId"),
	async (request, response) => {
		const { shiftId, userId, shiftRequestMessage } = request.body;
		
		await reassignShift(shiftId, userId, shiftRequestMessage, request.user.companyId, request.user.id);
		return response.sendStatus(200);
	}
);


// Get all shifts
shiftRouter.get(
	"/all",
	...validateRequest(getAllShiftsValidation),
	...permission("supervisor"),
	async (request, response) => {
		const { startDate, endDate } = matchedData(request);
		
		const shifts = await getAllShifts(request.user.companyId, startDate, endDate);
		response.send({ shifts });
	}
);

// Get my shifts
shiftRouter.get(
	"/",
	...validateRequest(getMyShiftsValidation),
	...permission("in company"),
	async (request, response) => {
		const { date, dir, skip, limit, sortBy="shiftEnd" } = matchedData(request);
		
		const shifts = await getShifts(request.user.id, date, dir, skip, limit, sortBy);
		response.send({ shifts });
	}
);


// Get someone's shifts
shiftRouter.get(
	"/users/:userId",
	...validateRequest(getSomeonesShiftsValidation),
	...permission("supervisor"),
	async (request, response) => {
		const { userId, date, dir, skip, limit, sortBy="shiftEnd" } = matchedData(request);
		
		const shifts = await getShifts(userId, date, dir, skip, limit, sortBy);
		response.send({ shifts });
	}
);


// Make cover request
shiftRouter.post(
	"/requests/add/:shiftId",
	...validateRequest(makeCoverRequestValidation),
	...permission("in company"),
	isMyShift("params.shiftId"),
	async (request, response) => {
		const {
			params: { shiftId },
			body: { message }
		} = request;
		
		try {
			const newShiftRequest = await createShiftRequest(
				shiftId, message, true, request.user.companyId, request.user.id
			);
			response.status(201).send({ shiftRequestId: newShiftRequest.id });
		} catch ({ message }) {
			return response.status(400).send({ message });
		}
	}
);


// Delete cover request
shiftRouter.delete(
	"/requests/:shiftRequestId",
	...validateRequest(deleteCoverRequestValidation),
	...permission("in company"),
	isMyShiftRequest("params.shiftRequestId"),
	async (request, response) => {
		const { shiftRequestId } = request.params;
		
		await deleteShiftRequest(shiftRequestId);
		return response.sendStatus(200);
	}
);


// Accept shift request
shiftRouter.post(
	"/requests/:shiftRequestId/accept",
	...validateRequest(acceptShiftRequestValidation),
	...permission("in company"),
	sameCompanyAsShiftRequest("params.shiftRequestId"),
	async (request, response) => {
		const { shiftRequestId } = request.params;
		
		const shiftId = await acceptShiftRequest(request.user.id, shiftRequestId);
		return response.send({ shiftId });
	}
);


// Delete and unassign shift(s)
shiftRouter.delete(
	"/",
	...validateRequest(deleteUnassignShiftsValidation),
	...permission("supervisor"),
	sameCompanyAsShifts("body.shiftIds"),
	async (request, response) => {
		const { shiftIds } = request.body;
		
		await deleteAndUnassignShifts(shiftIds);
		return response.sendStatus(200);
	}
);


// Update shift info
shiftRouter.put(
	"/",
	...validateRequest(updateShiftInfoValidation),
	...permission("supervisor"),
	sameCompanyAsShifts("body.shiftIds"),
	async (request, response) => {
		const { shiftIds, updatedInfo } = matchedData(request);
		
		await updateShiftInfos(shiftIds, updatedInfo);
		return response.sendStatus(200);
	}
);


// Clock in/out
shiftRouter.post(
	"/:shiftId/clock/:inOrOut",
	...validateRequest(clockInOutValidation),
	...permission("in company"),
	isMyShift("params.shiftId"),
	clockInOutPermission("params.shiftId", "params.inOrOut"),
	async (request, response) => {
		const { shiftId, inOrOut } = request.params;
		
		await (inOrOut === "in"? clockIn : clockOut)(shiftId);
		
		return response.sendStatus(200);
	}
);


// Get shift requests
shiftRouter.get(
	"/requests",
	...validateRequest(getShiftRequestsValidation),
	...permission("in company"),
	async (request, response) => {
		const { startDate, endDate } = matchedData(request);
		
		const shiftRequests = await getShiftRequests(request.user.companyId, startDate, endDate);
		return response.send({ shiftRequests });
	}
);



// --------------------------------

export default shiftRouter;