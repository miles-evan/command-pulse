import BetterFetch from "../utils/BetterFetch.js";


const rootURL = "http://192.168.1.202:80/command-pulse/api/v1/users"


// signup
export const signup = async (email, password, firstName, lastName, phoneNumber) =>
	await BetterFetch.post(rootURL + "/signup", { email, password, firstName, lastName, phoneNumber });

// login
export const login = async (email, password) =>
	await BetterFetch.post(rootURL + "/login", { email, password });

// logout
export const logout = async () =>
	await BetterFetch.post(rootURL + "/logout");

// check email availability
export const emailIsAvailable = async email =>
	await BetterFetch.get(rootURL + `/check-email/${email}`);

// login status check
export const status = async () =>
	await BetterFetch.get(rootURL + "/status");
