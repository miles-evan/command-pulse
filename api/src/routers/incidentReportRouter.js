import { Router } from "express";
import {
	generateIncidentReport,
	getAllIncidents, getIncidentReport,
	getIncidents,
	initializeIncidentReport
} from "../queries/incidentReportQueries.js";
import { permission } from "../middleware/permission.js";
import { isMyIncidentReport, isMyShift } from "../middleware/isMy.js";
import { isMyIncidentReportOrImSupervisor } from "../middleware/incidentReportPermissions.js";


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


// Generate / revise incident report
incidentReportRouter.post(
	"/generate",
	...permission("in company"),
	isMyIncidentReport("body.incidentReportId"),
	async (request, response) => {
		const { incidentReportId, incidentInfo } = request.body;
		
		const { followUpQuestions, report } = await generateIncidentReport(incidentReportId, incidentInfo);
		return response.send({ followUpQuestions, report });
	}
)


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


// Get incident report
incidentReportRouter.get(
	"/:incidentReportId",
	...permission("in company"),
	isMyIncidentReportOrImSupervisor("params.incidentReportId"),
	async (request, response) => {
		const { incidentReportId } = request.params;
		
		const report = await getIncidentReport(incidentReportId);
		return response.send({ report });
	}
);


// --------------------------------

export default incidentReportRouter;