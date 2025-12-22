import { Router } from "express";
import { deleteIncidentReport, generateIncidentReport, getAllIncidents, getIncidentReport, getIncidents, initializeIncidentReport } from "../queries/incidentReportQueries.js";
import { permission } from "../middleware/permission.js";
import { isMyIncidentReport, isMyShift } from "../middleware/isMy.js";
import { isMyIncidentReportOrImSupervisor } from "../middleware/incidentReportPermissions.js";
import { validateRequest } from "../middleware/validate.js";
import { deleteIncidentReportValidation, generateIncidentReportValidation, getAllIncidentsValidation, getIncidentReportValidation, getMyIncidentsValidation, initializeIncidentReportValidation } from "../validation/incidentReportValidation.js";
import { matchedData } from "express-validator";
const incidentReportRouter = Router();
// --------------------------------
// Initialize incident
incidentReportRouter.post("/init", ...validateRequest(initializeIncidentReportValidation), ...permission("in company"), isMyShift("body.shiftId"), async (request, response) => {
    const { shiftId } = request.body;
    const incidentReportId = await initializeIncidentReport(request.user.id, shiftId);
    return response.send({ incidentReportId });
});
// Generate / revise incident report
incidentReportRouter.post("/generate", ...validateRequest(generateIncidentReportValidation), ...permission("in company"), isMyIncidentReport("body.incidentReportId"), async (request, response) => {
    const { incidentReportId, incidentInfo } = request.body;
    const { followUpQuestions, report, title } = await generateIncidentReport(incidentReportId, incidentInfo);
    return response.send({ followUpQuestions, report, title });
});
// Get my incidents
incidentReportRouter.get("/", ...validateRequest(getMyIncidentsValidation), ...permission("in company"), async (request, response) => {
    const { skip, limit } = matchedData(request);
    const incidents = await getIncidents(request.user.id, skip, limit);
    return response.send({ incidents });
});
// Get all incidents
incidentReportRouter.get("/all", ...validateRequest(getAllIncidentsValidation), ...permission("supervisor"), async (request, response) => {
    const { skip, limit } = matchedData(request);
    const incidents = await getAllIncidents(request.user.companyId, skip, limit);
    return response.send({ incidents });
});
// Get incident report
incidentReportRouter.get("/:incidentReportId", ...validateRequest(getIncidentReportValidation), ...permission("in company"), isMyIncidentReportOrImSupervisor("params.incidentReportId"), async (request, response) => {
    const { incidentReportId } = request.params;
    const report = await getIncidentReport(incidentReportId);
    return response.send({ report });
});
// Delete incident report
incidentReportRouter.delete("/", ...validateRequest(deleteIncidentReportValidation), ...permission("in company"), isMyIncidentReportOrImSupervisor("body.incidentReportId"), async (request, response) => {
    const { incidentReportId } = request.body;
    await deleteIncidentReport(incidentReportId);
    return response.sendStatus(200);
});
// --------------------------------
export default incidentReportRouter;
