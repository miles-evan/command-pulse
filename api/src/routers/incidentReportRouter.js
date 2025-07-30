import { Router } from "express";
import {
	getAllIncidents,
	getIncidents,
	initializeIncidentReport
} from "../queries/incidentReportQueries.js";
import { permission } from "../middleware/permission.js";
import { isMyShift } from "../middleware/isMy.js";


const incidentReportRouter = Router();

// --------------------------------


// Initialize incident report
incidentReportRouter.post(
	"/init",
	...permission("in company"),
	isMyShift("body.shiftId"),
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
		
		const incidents = await getIncidents(request.user.id, Number(skip), Number(limit));
		return response.send({ incidents });
	}
);


// Get all incidents
incidentReportRouter.get(
	"/all",
	...permission("supervisor"),
	async (request, response) => {
		const { skip, limit } = request.query;
		
		const incidents = await getAllIncidents(request.user.companyId, Number(skip), Number(limit));
		return response.send({ incidents });
	}
);




// --------------------------------

export default incidentReportRouter;