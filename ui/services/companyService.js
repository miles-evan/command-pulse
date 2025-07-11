import * as fetch from "../utils/fetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/companies"

// create company
export const create = async companyName =>
	await fetch.post(rootURL, { companyName });

// check invite code
export const checkInviteCode = async inviteCode =>
	await fetch.get(rootURL + `/invite-codes/check/${inviteCode}`);

// join company
export const join = async inviteCode =>
	await fetch.post(rootURL + "/join", { inviteCode });

// leave company
export const leave = async () =>
	await fetch.post(rootURL + "/leave");

// check company name availability
export const companyNameIsAvailable = async companyName =>
	await fetch.get(rootURL + `/check-name/${companyName}`);

// get company status
export const status = async () =>
	await fetch.get(rootURL + "/status");