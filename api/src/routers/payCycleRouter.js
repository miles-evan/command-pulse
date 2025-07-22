import { Router } from "express";
import { permission } from "../middleware/permission.js";
import { getPayCycleSummary } from "../queries/payCycleQueries.js";

const payCycleRouter = Router();

// --------------------------------


// Get my pay cycle summary
payCycleRouter.get(
	"/",
	...permission("in company"),
	async (request, response) => {
		const { startDate, endDate } = request.query;
		
		const payCycleSummary = await getPayCycleSummary(request.user.id, startDate, endDate);
		return response.send(payCycleSummary);
	}
);



// --------------------------------

export default payCycleRouter;