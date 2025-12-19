import { body, param, query } from "express-validator";


const adminPasswordValidation = query("adminPassword")
	.exists().withMessage("adminPassword is required")
	.isString().withMessage("adminPassword must be a string");


export const getAllPromoCodesValidation = [
	adminPasswordValidation,
];

export const promoCodeExistsValidation = [
	adminPasswordValidation,
	param("code")
		.exists().withMessage("code param is required")
		.isString().withMessage("code must be a string")
		.isLength({ min: 8, max: 8 }).withMessage("promo code must be 8 characters"),
];

export const createPromoCodesValidation = [
	adminPasswordValidation,
	body("numCodes")
		.exists().withMessage("numCodes is required")
		.isInt({ min: 1, max: 100 }).withMessage("numCodes must be an integer between 1 and 100")
		.toInt(),
];
