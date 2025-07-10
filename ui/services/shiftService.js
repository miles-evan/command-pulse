import * as fetch from "../utils/fetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/shifts"

// create company
export const getMy = (date, time, dir, skip, limit) =>
	fetch.get(rootURL, { date, time, dir, skip, limit });