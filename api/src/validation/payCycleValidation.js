import { body, query, param } from "express-validator";

const dateFormat = "yyyy-mm-dd";
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;


export const getMyPayCycleSummaryValidation = [
	query("startDate")
		.optional()
		.matches(dateRegex).withMessage(`startDate must be in ${dateFormat} format`),
	query("endDate")
		.optional()
		.matches(dateRegex).withMessage(`endDate must be in ${dateFormat} format`)
];


export const getSomeonesPayCycleSummaryValidation = [
	...getMyPayCycleSummaryValidation,
	param("userId")
		.optional()
		.isString().withMessage("userId must be a string")
];


export const confirmPaymentSentValidation = [
	body("startDate")
		.exists().withMessage("startDate is required")
		.custom(value => value === null || typeof value === "string").withMessage("startDate must be a string or null"),
	body("endDate")
		.exists().withMessage("endDate is required")
		.custom(value => value === null || typeof value === "string").withMessage("endDate must be a string or null"),
	body("userId")
		.exists().withMessage("userId is required")
		.custom(value => value === null || typeof value === "string").withMessage("userId must be a string or null"),
	body("payCycleId")
		.exists().withMessage("payCycleId is required")
		.custom(value => value === null || typeof value === "string").withMessage("payCycleId must be a string or null"),
	body("paymentMethod")
		.optional()
		.isString().withMessage("userId must be a string"),
	body().custom(body => {
		const { startDate, endDate, userId, payCycleId } = body;
		if(startDate && endDate && userId && !payCycleId || !startDate && !endDate && !userId && payCycleId)
			return true;
		throw new Error("startDate, endDate, and userId must all be non null if payCycleId is null OR must all be null if payCycleId is not null");
	})
];


export const confirmPaymentReceivedValidation = [
	body("payCycleId")
		.exists().withMessage("payCycleId must be included")
		.isString().withMessage("payCycleId must be a string")
];


export const reviseHoursValidation = [
	...confirmPaymentSentValidation,
	body("hoursWorkedRevisions")
		.exists().withMessage("hoursWorkedRevisions must be included")
		.isArray({ min: 1 }).withMessage("hoursWorkedRevisions must be a non-empty array"),
	body("hoursWorkedRevisions.*.shiftId")
		.exists().withMessage("Each revision must have a shiftId")
		.isString().withMessage("shiftId must be a string"),
	body("hoursWorkedRevisions.*.hoursWorked")
		.exists().withMessage("Each revision must have hoursWorked")
		.isFloat({ min: 0 }).withMessage("hoursWorked must be a non-negative number")
];
