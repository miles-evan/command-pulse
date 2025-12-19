import BetterFetch from "../utils/BetterFetch.js";
import { API_URL } from "@/constants/apiUrl.js";


const rootURL = API_URL + "/companies";

// create company
export const create = (companyName: string, promoCode: string) =>
	BetterFetch.post(rootURL, { companyName, promoCode });

// check invite code
export const checkInviteCode = (inviteCode: string) =>
	BetterFetch.get(rootURL + `/invite-codes/check/${inviteCode}`);

// join company
export const join = (inviteCode: string) =>
	BetterFetch.post(rootURL + "/join", { inviteCode });

// leave company
export const leave = () =>
	BetterFetch.post(rootURL + "/leave");

// check company name availability
export const companyNameIsAvailable = (companyName: string) =>
	BetterFetch.get(rootURL + `/check-name/${companyName}`);

// get contacts
export const getContacts = () =>
	BetterFetch.get(rootURL + "/contacts");

// get invite codes
export const getInviteCodes = () =>
	BetterFetch.get(rootURL + "/invite-codes");

// reset invite codes
export const resetInviteCodes = () =>
	BetterFetch.post(rootURL + "/invite-codes/reset");

// remove user from company
export const removeUser = (userId: string) =>
	BetterFetch.post(rootURL + `/remove/${userId}`);

// get company status
export const status = () =>
	BetterFetch.get(rootURL + "/status");