import { User } from "../mongoose/schemas/userSchema.js";
import { Company } from "../mongoose/schemas/companySchema.js";
import {generateUniqueCode} from "../utils/inviteCodes.js";
import {expandUserIdArray} from "./userQueries.js";


export async function createCompany(companyName, supervisorId) {
    const newCompany = new Company({
        name: companyName,
        supervisorInviteCode: await generateUniqueCode("supervisorInviteCode"),
        officerInviteCode: await generateUniqueCode("officerInviteCode")
    });
    await newCompany.save();

    await joinCompanyById(supervisorId, newCompany.id, "supervisor");

    return newCompany;
}


export async function joinCompanyById(userId, companyId, role="officer") {
    if (!["officer", "supervisor"].includes(role)) {
        throw new Error("Invalid role");
    }

    await User.findByIdAndUpdate(userId, { $set: { companyId: companyId, isSupervisor: role === "supervisor" } })

    const roleField = role + "Ids";
    await Company.findByIdAndUpdate(companyId, { $addToSet: { [roleField]: userId } });
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


export async function getCompanyName(companyId) {
    const company = await Company.findById(companyId);
    return company.name;
}


export async function leaveCompany(userId) {
    const user = await User.findById(userId);
    const companyId = user.companyId;
    const roleField = user.isSupervisor? "supervisorIds" : "officerIds";

    await Company.findByIdAndUpdate(companyId, { $pull: { [roleField]: userId } });

    await User.findByIdAndUpdate(userId, { $set: {
        companyId: null, isSupervisor: false, shiftIds: [], payCycleIds: []
    }});
}


export async function getInviteCodes(companyId) {
    const { officerInviteCode, supervisorInviteCode } = await Company.findById(companyId);
    return { officerInviteCode, supervisorInviteCode }
}


export async function resetInviteCodes(companyId) {
    await Company.findByIdAndUpdate(companyId, {
        supervisorInviteCode: await generateUniqueCode("supervisorInviteCode"),
        officerInviteCode: await generateUniqueCode("officerInviteCode")
    });
}


export async function getContacts(companyId) {
    const { supervisorIds, officerIds } = await Company.findById(companyId);
    return { supervisors: await expandUserIdArray(supervisorIds), officers: await expandUserIdArray(officerIds) }
}
