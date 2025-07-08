import { body, param, query } from "express-validator";


export const createAssignShiftValidation = [
	body("date")
		.exists().withMessage("Date must be included")
		.matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Date must be in yyyy-mm-dd format"),
	body("startTime")
		.exists().withMessage("Start time must be included")
		.matches(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/).withMessage("Start time must be in h:mm AM/PM format"),
	body("endTime")
		.exists().withMessage("End time must be included")
		.matches(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/).withMessage("End time must be in h:mm AM/PM format"),
	body("location")
		.exists().withMessage("Location must be included")
		.isString().withMessage("Location must be a string")
		.trim()
		.isLength({ min: 1, max: 50 }).withMessage("Location must be 1-50 characters"),
	body("payRate")
		.exists().withMessage("Pay rate must be included")
		.isFloat({ min: 0 }).withMessage("Pay rate must be a positive number"),
	body("userId")
		.custom(value => value === null || typeof value === "string").withMessage("userId must be a string or null"),
	body("shiftRequestMessage")
		.optional()
		.isString().withMessage("Shift request message must be a string")
		.isLength({ max: 200 }).withMessage("Shift request message must be up to 200 characters")
];


export const reassignShiftValidation = [
	body("shiftId")
		.exists().withMessage("Shift ID must be included")
		.isString().withMessage("Shift ID must be a string"),
	body("userId")
		.custom(value => value === null || typeof value === "string").withMessage("userId must be a string or null"),
	body("shiftRequestMessage")
		.optional()
		.isString().withMessage("Shift request message must be a string")
		.isLength({ max: 200 }).withMessage("Shift request message must be up to 200 characters")
];


export const getAllShiftsValidation = [
	query("startDate")
		.optional()
		.matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("startDate must be yyyy-mm-dd"),
	query("endDate")
		.optional()
		.matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("endDate must be yyyy-mm-dd")
];


export const getMyShiftsValidation = [
	query("date")
		.optional()
		.matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("date must be yyyy-mm-dd"),
	query("dir")
		.optional()
		.isIn(["1", "-1"]).withMessage("dir must be 1 or -1")
		.toInt(),
	query("skip")
		.optional()
		.isInt({ min: 0 }).withMessage("skip must be a non-negative integer")
		.toInt(),
	query("limit")
		.optional()
		.isInt({ min: 1 }).withMessage("limit must be a positive integer")
		.toInt()
];


export const getSomeonesShiftsValidation = [
	...getMyShiftsValidation,
	param("userId")
		.exists().withMessage("userId param is required")
		.isString().withMessage("userId must be a string"),
];


export const makeCoverRequestValidation = [
	param("shiftId")
		.exists().withMessage("shiftId param is required")
		.isString().withMessage("shiftId must be a string"),
	body("message")
		.exists().withMessage("message must be included")
		.isString().withMessage("message must be a string")
		.isLength({ min: 1, max: 200 }).withMessage("message must be 1-200 characters")
];


export const deleteCoverRequestValidation = [
	param("shiftRequestId")
		.exists().withMessage("shiftRequestId param is required")
		.isString().withMessage("shiftRequestId must be a string")
];


export const acceptShiftRequestValidation = [
	param("shiftRequestId")
		.exists().withMessage("shiftRequestId param is required")
		.isString().withMessage("shiftRequestId must be a string")
];


export const deleteUnassignShiftsValidation = [
	body("shiftIds")
		.exists().withMessage("shiftIds must be included")
		.isArray({ min: 1 }).withMessage("shiftIds must be a non-empty array"),
	body("shiftIds.*")
		.isString().withMessage("Each shiftId must be a string")
];


export const updateShiftInfoValidation = [
	body("shiftIds")
		.exists().withMessage("shiftIds must be included")
		.isArray({ min: 1 }).withMessage("shiftIds must be a non-empty array"),
	body("shiftIds.*")
		.isString().withMessage("Each shiftId must be a string"),
	body("updatedInfo")
		.exists().withMessage("updatedInfo must be included")
		.isObject().withMessage("updatedInfo must be an object"),
	body("updatedInfo.date")
		.optional()
		.matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Date must be in yyyy-mm-dd format"),
	body("updatedInfo.location")
		.optional()
		.isString().withMessage("Location must be a string")
		.isLength({ min: 1, max: 50 }).withMessage("Location must be 1-50 characters"),
	body("updatedInfo.startTime")
		.optional()
		.matches(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/).withMessage("Start time must be in h:mm AM/PM format"),
	body("updatedInfo.endTime")
		.optional()
		.matches(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/).withMessage("End time must be in h:mm AM/PM format"),
	body("updatedInfo.payRate")
		.optional()
		.isFloat({ min: 0 }).withMessage("Pay rate must be a positive number")
];


export const clockInOutValidation = [
	param("shiftId")
		.exists().withMessage("shiftId param is required")
		.isString().withMessage("shiftId must be a string"),
	param("inOrOut")
		.exists().withMessage("inOrOut param is required")
		.isIn(["in", "out"]).withMessage("inOrOut must be 'in' or 'out'")
];