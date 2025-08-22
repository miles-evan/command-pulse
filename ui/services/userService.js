import BetterFetch from "../utils/BetterFetch.js";
import { API_URL } from "@/constants/apiUrl.js";


const rootURL = API_URL + "/users";


// signup
export const signup = (email, password, firstName, lastName, phoneNumber) =>
	BetterFetch.post(rootURL + "/signup", { email, password, firstName, lastName, phoneNumber });

// login
export const login = (email, password) =>
	BetterFetch.post(rootURL + "/login", { email, password });

// logout
export const logout = () =>
	BetterFetch.post(rootURL + "/logout");

// check email availability
export const emailIsAvailable = email =>
	BetterFetch.get(rootURL + `/check-email/${email}`);

// login status check
export const status = () =>
	BetterFetch.get(rootURL + "/status");
