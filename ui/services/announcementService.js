import BetterFetch from "../utils/BetterFetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/announcements"

// send announcement
export const send = async message =>
	await BetterFetch.post(rootURL, { message });

// get announcement
export const get = async (date, skip, limit) => {
	const response = await BetterFetch.get(rootURL, { date: date.toISOString(), skip, limit });
	response.body.announcements.map(expandAnnouncementDates);
	return response;
}


// -------------------------------- Helper functions:


function expandAnnouncementDates(announcement) {
	announcement.timeSent = new Date(announcement.timeSent);
}