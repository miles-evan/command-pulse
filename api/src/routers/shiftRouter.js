import { Router } from "express";
import { permission } from "../middleware/permission.js";
import {
	sameCompanyAsShift,
	sameCompanyAsShiftRequest,
	sameCompanyAsShifts,
	sameCompanyAsUser
} from "../middleware/sameCompanyAs.js";
import {
	acceptShiftRequest,
	createAndAssignShift,
	createShiftRequest, deleteAndUnassignShifts, deleteShiftRequest,
	getAllShifts,
	getShifts,
	reassignShift, updateShiftInfo, updateShiftInfos
} from "../queries/shiftQueries.js";
import {isMyShift, isMyShiftRequest} from "../middleware/isMy.js";
import { clockInOutPermission } from "../middleware/clockInOutPermission.js";
import {validateRequest} from "../middleware/validate.js";
import {
	acceptShiftRequestValidation, clockInOutValidation,
	createAssignShiftValidation, deleteCoverRequestValidation, deleteShiftsValidation,
	getAllShiftsValidation, getMyShiftsValidation, getSomeonesShiftsValidation, makeCoverRequestValidation,
	reassignShiftValidation, updateShiftInfoValidation
} from "../validation/shiftValidation.js";

const shiftRouter = Router();

// --------------------------------


// Create and assign (or shift request) shift
shiftRouter.post(
	"/assign",
	...validateRequest(createAssignShiftValidation),
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


// Reassign / shift request shift
shiftRouter.post(
	"/reassign",
	...validateRequest(reassignShiftValidation),
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
	...validateRequest(getAllShiftsValidation),
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
	...validateRequest(getMyShiftsValidation),
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
	...validateRequest(getSomeonesShiftsValidation),
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
	...validateRequest(makeCoverRequestValidation),
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
	...validateRequest(deleteShiftsValidation),
	...permission("supervisor"),
	sameCompanyAsShifts("body.shiftIds"),
	async (request, response) => {
		const { shiftIds } = request.body;
		
		await deleteAndUnassignShifts(shiftIds);
	}
);


// Update shift info
shiftRouter.put(
	"/",
	...validateRequest(updateShiftInfoValidation),
	...permission("supervisor"),
	sameCompanyAsShifts("body.shiftIds"),
	async (request, response) => {
		const {
			shiftIds,
			updatedInfo: { date, location, startTime, endTime, payRate }
		} = request.body;
		
		// remove later once validation is added (use matchedData())
		const updatedInfo = { date, location, startTime, endTime, payRate }
		for(const attribute in updatedInfo) {
			if(updatedInfo[attribute] === undefined)
				delete updatedInfo[attribute];
		}
		
		await updateShiftInfos(shiftIds, updatedInfo);
		response.sendStatus(200);
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
		
		const propertyToUpdate = inOrOut === "in"? "clockInTime": "clockOutTime";
		
		const now = new Date();
		const timeString = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
		
		await updateShiftInfo(shiftId, { [propertyToUpdate]: timeString });
		
		response.sendStatus(200);
	}
);


// --------------------------------

export default shiftRouter;