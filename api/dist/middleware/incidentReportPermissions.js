import { isMyIncidentReport } from "./isMy.js";
import { sameCompanyAsIncidentReport } from "./sameCompanyAs.js";
// checks that user is either a supervisor in the same company OR I own the incident report
export function isMyIncidentReportOrImSupervisor(pathFromRequestToIncidentReportId) {
    return async (request, response, next) => {
        if (request.user.isSupervisor)
            await sameCompanyAsIncidentReport(pathFromRequestToIncidentReportId)(request, response, next);
        else
            await isMyIncidentReport(pathFromRequestToIncidentReportId)(request, response, next);
    };
}
