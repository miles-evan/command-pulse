import { IncidentReport } from "../mongoose/schemas/incidentReportSchema.js";
import { User } from "../mongoose/schemas/userSchema.js";
import { Shift } from "../mongoose/schemas/shiftSchema.js";
import { projectShifts } from "./shiftQueries.js";
import { Company } from "../mongoose/schemas/companySchema.js";
import mongoose from "mongoose";
import { promptGenerateIncidentReport, promptReviseIncidentReport } from "../chatGPT/incidentReportPrompts.js";


export async function initializeIncidentReport(userId, shiftId) {
	const newIncidentReport = new IncidentReport({
		userId,
		title: "Untitled incident",
		shiftId,
		dateCreated: new Date(),
	});
	await newIncidentReport.save();
	
	await User.findByIdAndUpdate(userId, { $push: { incidentReportIds: newIncidentReport._id } });
	
	return newIncidentReport.id;
}


// --------------------------------


export async function generateIncidentReport(incidentReportId, incidentInfo) {
	const incidentReport = await IncidentReport.findById(incidentReportId).lean();
	
	if(incidentReport.report === null) {
		const user = await User.findById(incidentReport.userId).lean();
		const company = await Company.findById(user.companyId).lean();
		const shift = await Shift.findById(incidentReport.shiftId).lean();
		
		const {
			report, followUpQuestions, title
		} = await promptGenerateIncidentReport(user, company, shift, incidentReport.dateCreated, incidentInfo);
		
		if(!report || !title)
			throw new Error("ChatGPT returned invalid response");
		
		await IncidentReport.findByIdAndUpdate(incidentReportId, { report: report });
		await IncidentReport.findByIdAndUpdate(incidentReportId, { title: title });
		
		return { report, followUpQuestions, title };
	} else {
		const { report, title } = await promptReviseIncidentReport(incidentReport.report, incidentInfo);
		
		if(!report || !title)
			throw new Error("ChatGPT returned invalid response");
		
		await IncidentReport.findByIdAndUpdate(incidentReportId, { report: report });
		await IncidentReport.findByIdAndUpdate(incidentReportId, { title: title });
		
		return { report, title };
	}
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


export async function getIncidentReport(incidentReportId) {
	return (await IncidentReport.findById(incidentReportId)).report;
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


export async function deleteIncidentReport(incidentReportId) {
	const report = await IncidentReport.findByIdAndDelete(incidentReportId);
	await User.findByIdAndUpdate(report.userId, { $pull: { incidentReportIds: incidentReportId } });
}


// --------------------------------


export async function userOwnsIncidentReport(userId, incidentReportId) {
	const user = await User.findOne({ _id: userId, incidentReportIds: incidentReportId });
	return !!user;
}