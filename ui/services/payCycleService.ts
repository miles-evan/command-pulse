import BetterFetch from "../utils/BetterFetch.js";
import { expandShiftDates } from "@/services/shiftService.js";
import { API_URL } from "@/constants/apiUrl.js";


const rootURL = API_URL + "/pay-cycles";

// get someone else's pay cycle summary
export const getSummary = async (userId: string | null = null, startDate: Date, endDate: Date) => {
	const response = await BetterFetch.get(rootURL + (userId? `/${ userId }` : ""), {
		startDate: startDate.toISOString(), endDate: endDate.toISOString()
	});
	response.body.shifts?.forEach?.(expandShiftDates);
	return response;
}

// confirm payment sent
export const confirmSent = async (
	userId: string, startDate: Date, endDate: Date, payCycleId: string | null = null,
	paymentMethod?: "Cash" | "Electronic transfer" | "Payroll"
) => {
	await BetterFetch.post(rootURL + `/confirm-sent`, {
		userId, startDate: startDate.toISOString(), endDate: endDate.toISOString(), payCycleId,
		...(paymentMethod === undefined? {} : { paymentMethod }),
	});
}

// confirm payment received
export const confirmReceived = async (payCycleId: string) =>
	await BetterFetch.post(rootURL + `/confirm-received`, { payCycleId });

// revise hours worked
export const reviseHours = async (
	userId: string, startDate: Date, endDate: Date, payCycleId: string | null = null,
	hoursWorkedRevisions: Array<{ shiftId: string, hoursWorked: number }>
) => {
	await BetterFetch.post(rootURL + `/revise-hours`, {
		userId,
		startDate: startDate?.toISOString() ?? null,
		endDate: endDate?.toISOString() ?? null,
		payCycleId,
		hoursWorkedRevisions
	});
}