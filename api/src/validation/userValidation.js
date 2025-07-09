import {body, param} from "express-validator";


export const signupValidation = [
	body("email")
		.exists().withMessage("Email must be included")
		.isString().withMessage("Email must be a string")
		.trim()
		.toLowerCase()
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Email must be valid"),
	body("password")
		.exists().withMessage("Password must be included")
		.isString().withMessage("Password must be a string")
		.notEmpty().withMessage("Password is required")
		.isLength({ min: 6, max: 24 }).withMessage("Password must be 6-24 characters"),
	body("firstName")
		.exists().withMessage("First name must be included")
		.isString().withMessage("First name must be a string")
		.trim()
		.notEmpty().withMessage("First name is required")
		.isLength({ min: 1, max: 30 }).withMessage("First name must be 1-30 characters"),
	body("lastName")
		.exists().withMessage("Last name must be included")
		.isString().withMessage("Last name must be a string")
		.trim()
		.notEmpty().withMessage("Last name is required")
		.isLength({ min: 1, max: 30 }).withMessage("Last name must be 1-30 characters"),
	body("phoneNumber")
		.exists().withMessage("Phone number must be included")
		.isString().withMessage("Phone number must be a string")
		.trim()
		.notEmpty().withMessage("Phone number is required")
		.matches(/^\+?[0-9]{7,15}$/).withMessage("Phone number must be a valid format")
];


export const loginValidation = [
	body("email")
		.exists().withMessage("Email must be included")
		.isString().withMessage("Email must be a string")
		.trim()
		.toLowerCase()
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Email must be valid"),
	body("password")
		.exists().withMessage("Password must be included")
		.isString().withMessage("Password must be a string")
		.notEmpty().withMessage("Password is required")
		.isLength({ min: 6, max: 24 }).withMessage("Password must be 6-24 characters")
];


export const checkEmailAvailabilityValidation = [
	param("email")
		.exists().withMessage("Email must be included")
		.isString().withMessage("Email must be a string")
		.trim()
		.toLowerCase()
		.notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Email must be valid")
]
