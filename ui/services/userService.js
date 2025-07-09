import * as fetch from "../utils/fetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/users"


// signup
export const signup = async (email, password, firstName, lastName, phoneNumber) =>
	await fetch.post(rootURL + "/signup", { email, password, firstName, lastName, phoneNumber });

// login
export const login = async (email, password) =>
	await fetch.post(rootURL + "/login", { email, password });

// logout
export const logout = async () =>
	await fetch.post(rootURL + "/logout");

// check email availability
export const emailIsAvailable = async email =>
	await fetch.get(rootURL + `/check-email/${email}`);

// login status check
export const status = async () =>
	await fetch.get(rootURL + "/status");
