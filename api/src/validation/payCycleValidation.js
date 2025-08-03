import { body, query, param } from "express-validator";


export const getMyPayCycleSummaryValidation = [
	query("startDate")
		.optional()
		.isISO8601().withMessage("startDate must be a valid ISO 8601 date")
		.toDate(),
	query("endDate")
		.optional()
		.isISO8601().withMessage("endDate must be a valid ISO 8601 date")
		.toDate(),
];


export const getSomeonesPayCycleSummaryValidation = [
	...getMyPayCycleSummaryValidation,
	param("userId")
		.exists().withMessage("userId param is required")
		.isString().withMessage("userId must be a string"),
];

export const confirmPaymentSentValidation = [
	body("startDate")
		.exists().withMessage("startDate is required")
		.optional({ nullable: true })
		.isISO8601().withMessage("startDate must be a valid ISO 8601 date or null")
		.toDate(),
	body("endDate")
		.exists().withMessage("endDate is required")
		.optional({ nullable: true })
		.isISO8601().withMessage("endDate must be a valid ISO 8601 date or null")
		.toDate(),
	body("userId")
		.exists().withMessage("userId is required")
		.optional({ nullable: true })
		.isString().withMessage("userId must be a string or null"),
	body("payCycleId")
		.exists().withMessage("payCycleId is required")
		.optional({ nullable: true })
		.isString().withMessage("payCycleId must be a string or null"),
	body("paymentMethod")
		.optional()
		.isString().withMessage("paymentMethod must be a string"),
	body().custom(({ startDate, endDate, userId, payCycleId }) => {
		if(startDate && endDate && userId && !payCycleId || !startDate && !endDate && !userId && payCycleId)
			return true;
		throw new Error(
			"startDate, endDate, and userId must all be non-null if payCycleId is null, or all null if payCycleId is not"
		);
	}),
];


export const confirmPaymentReceivedValidation = [
	body("payCycleId")
		.exists().withMessage("payCycleId must be included")
		.isString().withMessage("payCycleId must be a string"),
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
		.isFloat({ min: 0 }).withMessage("hoursWorked must be a non-negative number"),
];
