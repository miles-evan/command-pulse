import { body, param } from "express-validator";


export const createCompanyValidation = [
	body("companyName")
		.exists().withMessage("Company name must be included")
		.isString().withMessage("Company name must be a string")
		.trim()
		.notEmpty().withMessage("Company name is required")
		.isLength({ min: 2, max: 50 }).withMessage("Company name must be 2-50 characters")
];


export const joinCompanyValidation = [
	body("inviteCode")
		.exists().withMessage("Invite code must be included")
		.isString().withMessage("Invite code must be a string")
		.trim()
		.notEmpty().withMessage("Invite code is required")
		.isLength({ min: 8, max: 8 }).withMessage("Invite code must be 8 characters")
];


export const checkInviteCodeValidation = [
	param("inviteCode")
		.exists().withMessage("Invite code must be included")
		.isString().withMessage("Invite code must be a string")
		.trim()
		.notEmpty().withMessage("Invite code is required")
		.isLength({ min: 8, max: 8 }).withMessage("Invite code must be 8 characters")
];


export const checkCompanyNameAvailabilityValidation = [
	param("companyName")
		.exists().withMessage("Company name must be included")
		.isString().withMessage("Company name must be a string")
		.trim()
		.notEmpty().withMessage("Company name is required")
		.isLength({ min: 2, max: 50 }).withMessage("Company name must be 2-50 characters")
];