import { IncidentReport } from "../mongoose/schemas/incidentReportSchema.js";
import { getTodayString } from "../utils/dateUtils.js";
import { User } from "../mongoose/schemas/userSchema.js";
import { Shift } from "../mongoose/schemas/shiftSchema.js";
import { projectShifts } from "./shiftQueries.js";
import { Company } from "../mongoose/schemas/companySchema.js";
import mongoose from "mongoose";


export async function initializeIncidentReport(userId, title, shiftId) {
	const newIncidentReport = new IncidentReport({
		userId,
		title,
		shiftId,
		dateCreated: getTodayString(),
	});
	await newIncidentReport.save();
	
	await User.findByIdAndUpdate(userId, { $push: { incidentReportIds: newIncidentReport._id } });
	
	return newIncidentReport.id;
}


// --------------------------------


export async function getIncidents(userId, skip, limit) {
	const user = await User.findById(userId);
	
	const incidentReports = await IncidentReport.find({
		_id: { $in: user.incidentReportIds }
	}).sort({ dateCreated: -1 }).skip(skip).limit(limit);
	
	return projectIncidentReports(incidentReports);
}


export async function getAllIncidents(companyId, skip, limit) {
	const incidentReports = await Company.aggregate([
		{ $match: { _id: new mongoose.Types.ObjectId(companyId) } },
		{ $lookup: {
			from: "users",
			let: {
				supervisorIds: "$supervisorIds",
				officerIds: "$officerIds"
			},
			pipeline: [{ $match: { $expr: {
				$or: [
					{ $in: ["$_id", "$$supervisorIds"] },
					{ $in: ["$_id", "$$officerIds"] }
				]
			}}}],
			as: "companyUsers"
		}},
		{ $unwind: "$companyUsers" },
		{ $replaceWith: "$companyUsers" },
		{ $lookup: {
			from: "incidentreports",
			localField: "_id",
			foreignField: "userId",
			as: "incidentReports"
		}},
		{ $unwind: "$incidentReports" },
		{ $replaceWith: "$incidentReports" },
		{ $sort: { dateCreated: -1 } },
		{ $skip: skip },
		{ $limit: limit }
	]);
	
	return projectIncidentReports(incidentReports)
}


// --------------------------------


async function projectIncidentReports(incidentReports) {
	const shiftIds = [...new Set(incidentReports.map(incidentReport => incidentReport.shiftId))];
	const shifts = await Shift.find({ _id: { $in: shiftIds } });
	const projectedShifts = await projectShifts(shifts);
	const projectedShiftMap = {};
	projectedShifts.forEach(shift => {projectedShiftMap[shift.shiftId] = shift});
	
	return incidentReports.map(incidentReport => ({
		incidentReportId: incidentReport.id,
		title: incidentReport.title,
		dateCreated: incidentReport.dateCreated,
		shift: {
			firstName: projectedShiftMap[incidentReport.shiftId].firstName,
			lastName: projectedShiftMap[incidentReport.shiftId].lastName,
			date: projectedShiftMap[incidentReport.shiftId].date,
			location: projectedShiftMap[incidentReport.shiftId].location,
		}
	}));
}


// --------------------------------


export async function userOwnsIncidentReport(userId, incidentReportId) {
	const user = await User.findOne({ _id: userId, incidentReportIds: incidentReportId });
	return !!user;
}