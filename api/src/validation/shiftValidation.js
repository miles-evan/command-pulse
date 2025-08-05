import { body, param, query } from "express-validator";

export const createAssignShiftValidation = [
	body("shiftStart")
		.exists().withMessage("shiftStart is required")
		.isISO8601().withMessage("shiftStart must be a valid ISO 8601 date-time string")
		.toDate(),
	body("shiftEnd")
		.exists().withMessage("shiftEnd is required")
		.isISO8601().withMessage("shiftEnd must be a valid ISO 8601 date-time string")
		.toDate(),
	body("location")
		.exists().withMessage("location is required")
		.isString().withMessage("location must be a string")
		.trim()
		.isLength({ min: 1, max: 50 }).withMessage("location must be 1–50 characters"),
	body("payRate")
		.exists().withMessage("payRate is required")
		.isFloat({ min: 0 }).withMessage("payRate must be a non-negative number"),
	body("userId")
		.optional({ nullable: true })
		.isString().withMessage("userId must be a string"),
	body("shiftRequestMessage")
		.optional()
		.isString().withMessage("shiftRequestMessage must be a string")
		.isLength({ max: 200 }).withMessage("shiftRequestMessage must be up to 200 characters"),
];

export const reassignShiftValidation = [
	body("shiftId")
		.exists().withMessage("shiftId is required")
		.isString().withMessage("shiftId must be a string"),
	body("userId")
		.optional({ nullable: true })
		.isString().withMessage("userId must be a string"),
	body("shiftRequestMessage")
		.optional()
		.isString().withMessage("shiftRequestMessage must be a string")
		.isLength({ max: 200 }).withMessage("shiftRequestMessage must be up to 200 characters"),
];

export const getAllShiftsValidation = [
	query("startDate")
		.optional()
		.isISO8601().withMessage("startDate must be a valid ISO 8601 date-time string")
		.toDate(),
	query("endDate")
		.optional()
		.isISO8601().withMessage("endDate must be a valid ISO 8601 date-time string")
		.toDate(),
];

export const getMyShiftsValidation = [
	query("date")
		.exists().withMessage("date is required")
		.isISO8601().withMessage("date must be a valid ISO 8601 date-time string")
		.toDate(),
	query("dir")
		.optional()
		.isIn(["1", "-1"]).withMessage("dir must be '1' or '-1'")
		.toInt(),
	query("skip")
		.optional()
		.isInt({ min: 0 }).withMessage("skip must be a non-negative integer")
		.toInt(),
	query("limit")
		.optional()
		.isInt({ min: 1, max: 50 }).withMessage("limit must be an integer between 1 and 50")
		.toInt(),
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
		.exists().withMessage("message is required")
		.isString().withMessage("message must be a string")
		.isLength({ min: 1, max: 200 }).withMessage("message must be 1–200 characters"),
];

export const deleteCoverRequestValidation = [
	param("shiftRequestId")
		.exists().withMessage("shiftRequestId param is required")
		.isString().withMessage("shiftRequestId must be a string"),
];

export const acceptShiftRequestValidation = [
	param("shiftRequestId")
		.exists().withMessage("shiftRequestId param is required")
		.isString().withMessage("shiftRequestId must be a string"),
];

export const deleteUnassignShiftsValidation = [
	body("shiftIds")
		.exists().withMessage("shiftIds is required")
		.isArray({ min: 1 }).withMessage("shiftIds must be a non-empty array"),
	body("shiftIds.*")
		.isString().withMessage("each shiftId must be a string"),
];

export const updateShiftInfoValidation = [
	body("shiftIds")
		.exists().withMessage("shiftIds is required")
		.isArray({ min: 1 }).withMessage("shiftIds must be a non-empty array"),
	body("shiftIds.*")
		.isString().withMessage("each shiftId must be a string"),
	body("updatedInfo")
		.exists().withMessage("updatedInfo is required")
		.isObject().withMessage("updatedInfo must be an object")
		.custom(obj => {
			const keys = Object.keys(obj);
			if(keys.some(key => !["shiftStart", "shiftEnd", "location", "payRate"].includes(key)))
				throw new Error("updatedInfo can only include date, shiftStart, shiftEnd, location, payRate");
			if(keys.length === 0)
				throw new Error("updatedInfo must have at least one valid field");
			return true;
		}),
	body("updatedInfo.shiftStart")
		.optional()
		.isISO8601().withMessage("shiftStart must be a valid ISO 8601 date-time string")
		.toDate(),
	body("updatedInfo.shiftEnd")
		.optional()
		.isISO8601().withMessage("shiftEnd must be a valid ISO 8601 date-time string")
		.toDate(),
	body("updatedInfo.location")
		.optional()
		.isString().withMessage("location must be a string")
		.trim()
		.isLength({ min: 1, max: 50 }).withMessage("location must be 1–50 characters"),
	body("updatedInfo.payRate")
		.optional()
		.isFloat({ min: 0 }).withMessage("payRate must be a non-negative number"),
];

export const clockInOutValidation = [
	param("shiftId")
		.exists().withMessage("shiftId param is required")
		.isString().withMessage("shiftId must be a string"),
	param("inOrOut")
		.exists().withMessage("inOrOut param is required")
		.isIn(["in", "out"]).withMessage("inOrOut must be 'in' or 'out'"),
];
