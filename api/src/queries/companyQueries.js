import { User } from "../mongoose/schemas/userSchema.js";
import { Company } from "../mongoose/schemas/companySchema.js";
import { generateUniqueCompanyInviteCode } from "../utils/uniqueCodes.js";
import { expandUserIdArray } from "./userQueries.js";
import capitalize from "../utils/capitalize.js";


export async function createCompany(companyName, supervisorId) {
	const newCompany = new Company({
		name: capitalize(companyName),
		supervisorInviteCode: await generateUniqueCompanyInviteCode("supervisorInviteCode"),
		officerInviteCode: await generateUniqueCompanyInviteCode("officerInviteCode")
	});
	await newCompany.save();
	
	await joinCompanyById(supervisorId, newCompany.id, "supervisor");
	
	return newCompany;
}


export async function joinCompanyByInviteCode(userId, inviteCode) {
	let role = "supervisor";
	let company = await Company.findOne({ supervisorInviteCode: inviteCode });
	if(!company) {
		role = "officer";
		company = await Company.findOne({ officerInviteCode: inviteCode });
	}
	if(!company) throw new Error("Invalid invite code");
	await joinCompanyById(userId, company.id, role);
	return company.id;
}


async function joinCompanyById(userId, companyId, role="officer") {
	if (!["officer", "supervisor"].includes(role))
		throw new Error("Invalid role");
	
	await User.findByIdAndUpdate(userId, { $set: { companyId, isSupervisor: role === "supervisor" } });
	
	const roleField = role + "Ids";
	await Company.findByIdAndUpdate(companyId, { $addToSet: { [roleField]: userId } });
	
	await unArchive(userId, companyId);
}


// pull from archive and add to user if user was previously in this company
async function unArchive(userId, companyId) {
	const company = await Company.findById(companyId).populate([
		'archive.shiftIds',
		'archive.payCycleIds',
		'archive.incidentReportIds'
	]);
	
	const user = await User.findById(userId);
	
	const archivedShiftIds = [];
	company.archive.shiftIds.forEach(shift => {
		if(shift.userId.equals(userId)) {
			user.shiftIds.push(shift._id);
			archivedShiftIds.push(shift._id)
		}
	});
	
	const archivedPayCycleIds = [];
	company.archive.payCycleIds.forEach(payCycle => {
		if(payCycle.userId.equals(userId)) {
			user.payCycleIds.push(payCycle._id);
			archivedPayCycleIds.push(payCycle._id)
		}
	});
	
	const archivedIncidentReportIds = [];
	company.archive.incidentReportIds.forEach(incidentReport => {
		if(incidentReport.userId.equals(userId)) {
			user.incidentReportIds.push(incidentReport._id);
			archivedIncidentReportIds.push(incidentReport._id)
		}
	});
	
	await user.save();
	
	await Company.findByIdAndUpdate(companyId, { $pull: {
		"archive.shiftIds": { $in: archivedShiftIds },
		"archive.payCycleIds": { $in: archivedPayCycleIds },
		"archive.incidentReportIds": { $in: archivedIncidentReportIds },
	}});
}


export async function checkInviteCode(inviteCode) {
	return !!await Company.findOne({ $or: [
		{ supervisorInviteCode: inviteCode },
		{ officerInviteCode: inviteCode }
	]});
}


export async function getCompanyName(companyId) {
	const company = await Company.findById(companyId);
	return company.name;
}


export async function leaveCompany(userId) {
	const user = await User.findById(userId);
	const companyId = user.companyId;
	const roleField = user.isSupervisor? "supervisorIds" : "officerIds";
	
	// load company archive
	await Company.findByIdAndUpdate(companyId, {
		$pull: { [roleField]: userId },
		$push: {
			"archive.shiftIds": { $each: user.shiftIds },
			"archive.payCycleIds": { $each: user.payCycleIds },
			"archive.incidentReportIds": { $each: user.incidentReportIds },
		},
	});
	
	await User.findByIdAndUpdate(userId, { $set: {
		companyId: null, isSupervisor: false, shiftIds: [], payCycleIds: [], incidentReportIds: []
	}});
}


export async function getInviteCodes(companyId) {
	const { officerInviteCode, supervisorInviteCode } = await Company.findById(companyId);
	return { officerInviteCode, supervisorInviteCode }
}


export async function resetInviteCodes(companyId) {
	await Company.findByIdAndUpdate(companyId, {
		supervisorInviteCode: await generateUniqueCompanyInviteCode("supervisorInviteCode"),
		officerInviteCode: await generateUniqueCompanyInviteCode("officerInviteCode")
	});
}


export async function getContacts(companyId) {
	const { supervisorIds, officerIds } = await Company.findById(companyId);
	return { supervisors: await expandUserIdArray(supervisorIds), officers: await expandUserIdArray(officerIds) }
}


export async function checkCompanyNameAvailability(companyName) {
	return !await Company.findOne({ name: companyName });
}