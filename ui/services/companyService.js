import BetterFetch from "../utils/BetterFetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/companies"

// create company
export const create = async companyName =>
	await BetterFetch.post(rootURL, { companyName });

// check invite code
export const checkInviteCode = async inviteCode =>
	await BetterFetch.get(rootURL + `/invite-codes/check/${inviteCode}`);

// join company
export const join = async inviteCode =>
	await BetterFetch.post(rootURL + "/join", { inviteCode });

// leave company
export const leave = async () =>
	await BetterFetch.post(rootURL + "/leave");

// check company name availability
export const companyNameIsAvailable = async companyName =>
	await BetterFetch.get(rootURL + `/check-name/${companyName}`);

// get contacts
export const getContacts = async () =>
	await BetterFetch.get(rootURL + "/contacts");

// get invite codes
export const getInviteCodes = async () =>
	await BetterFetch.get(rootURL + "/invite-codes");

// reset invite codes
export const resetInviteCodes = async () =>
	await BetterFetch.post(rootURL + "/invite-codes/reset");

// get company status
export const status = async () =>
	await BetterFetch.get(rootURL + "/status");