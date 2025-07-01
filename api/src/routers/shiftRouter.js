import { Router } from "express";
import { permission } from "../middleware/permission.js";
import {sameCompanyAsShift, sameCompanyAsUser} from "../middleware/sameCompanyAs.js";
import {createAndAssignShift, reassignShift} from "../queries/shiftQueries.js";

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


// --------------------------------

export default shiftRouter;