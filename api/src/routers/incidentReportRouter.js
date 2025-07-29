import { Router } from "express";
import { getIncidentReports, initializeIncidentReport } from "../queries/incidentReportQueries.js";
import { permission } from "../middleware/permission.js";
import { isMyIncidentReport } from "../middleware/isMy.js";


const incidentReportRouter = Router();

// --------------------------------


// Initialize incident report
incidentReportRouter.post(
	"/init",
	...permission("in company"),
	async (request, response) => {
		const { title, shiftId } = request.body;
		
		const incidentReportId = await initializeIncidentReport(request.user.id, title, shiftId);
		return response.send({ incidentReportId });
	}
);


// Get my incidents
incidentReportRouter.get(
	"/",
	...permission("in company"),
	async (request, response) => {
		const { skip, limit } = request.query;
		
		const incidents = await getIncidentReports(request.user.id, skip, limit);
		return response.send({ incidents });
	}
)


// Get all incidents





// --------------------------------

export default incidentReportRouter;