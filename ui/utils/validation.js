import * as companyService from "@/services/companyService";
import * as userService from "@/services/userService";


// functions used with ErrorMessages components


export async function validateInviteCode({ inviteCode }) {
	if(!/^\d{8}$/.test(inviteCode))
		return { errorMessages: ["Must be an 8 digit number"], passed: false };
	
	const response = await companyService.checkInviteCode(inviteCode);
	
	if(!response.ok)
		return { errorMessages: [JSON.stringify(response.body)], passed: false };
	
	return { errorMessages: response.body.isValid? [] : ["Company not found"], passed: response.body.isValid }
}


export function validateLoginInfo({ email, password }) {
	const errorMessages = [];
	
	if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
		errorMessages.push("Email must be valid");
	
	if(password.length < 6 || password.length > 24)
		errorMessages.push("Password must be 6-24 characters");
	
	return { errorMessages, passed: errorMessages.length === 0 }
}


export async function validateSignupInfo({ email, password }) {
	const { errorMessages, passed } = validateLoginInfo({ email, password });
	if(!passed) return { errorMessages, passed }
	
	if(!(await userService.emailIsAvailable(email)).body.isAvailable)
		errorMessages.push("Email already taken");
	
	return { errorMessages, passed: errorMessages.length === 0 }
}


export function validatePersonalInfo({ firstName, lastName, phoneNumber }) {
	const errorMessages = [];
	
	if (firstName.length > 30 || firstName.length < 1)
		errorMessages.push("First name must be 1-30 characters");
	
	if (lastName.length > 30 || lastName.length < 1)
		errorMessages.push("Last name must be 1-30 characters");
	
	if (!/^\+?[0-9]{7,15}$/.test(phoneNumber.trim()))
		errorMessages.push("Invalid phone number");
	
	return { errorMessages, passed: errorMessages.length === 0 }
}


export async function validateCompanyName({ companyName }) {
	
	const errorMessages = [];
	
	if (companyName.length < 2 || companyName.length > 50)
		errorMessages.push("Company name must be 2-50 characters");
	
	if(!(await companyService.companyNameIsAvailable(companyName)).body.isAvailable)
		errorMessages.push("Company name already taken");
	
	return { errorMessages, passed: errorMessages.length === 0 };
}
