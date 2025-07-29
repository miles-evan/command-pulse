import { IncidentReport } from "../mongoose/schemas/incidentReportSchema.js";
import { getTodayString } from "../utils/dateUtils.js";
import { User } from "../mongoose/schemas/userSchema.js";
import { Shift } from "../mongoose/schemas/shiftSchema.js";
import { projectShifts } from "./shiftQueries.js";


export async function initializeIncidentReport(userId, title, shiftId) {
	const newIncidentReport = new IncidentReport({
		title,
		shiftId,
		dateCreated: getTodayString(),
	});
	await newIncidentReport.save();
	
	await User.findByIdAndUpdate(userId, { $push: { incidentReportIds: newIncidentReport._id } });
	
	return newIncidentReport.id;
}


// --------------------------------


export async function getIncidentReports(userId, skip, limit) {
	const user = await User.findById(userId);
	
	const incidentReports = await IncidentReport.find({
		_id: { $in: user.incidentReportIds }
	}).sort({ dateCreated: -1 }).skip(skip).limit(limit);
	
	return projectIncidentReports(incidentReports);
}


// --------------------------------


async function projectIncidentReports(incidentReports) {
	const shiftIds = [...new Set(incidentReports.map(incidentReport => incidentReport.shiftId))];
	const shifts = await Shift.find({ _id: { $in: shiftIds } });
	const projectedShifts = await projectShifts(shifts);
	const projectedShiftMap = {};
	projectedShifts.forEach(shift => {projectedShiftMap[shift.id] = shift});
	
	return incidentReports.map(incidentReport => ({
		incidentReportId: incidentReport.id,
		title: incidentReport.title,
		dateCreated: incidentReport.dateCreated,
		shift: {
			firstName: projectedShiftMap[incidentReport.shiftId].firstName,
			lastName: projectedShiftMap[incidentReport.shiftId].lastName,
			date: projectedShiftMap[incidentReport.shiftId].date,
			locationName: projectedShiftMap[incidentReport.shiftId].locationName,
		}
	}));
}


// --------------------------------


export async function userOwnsIncidentReport(userId, incidentReportId) {
	const user = await User.findOne({ _id: userId, incidentReportIds: incidentReportId });
	return !!user;
}