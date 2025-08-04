import { body, param, query } from "express-validator";


export const initializeIncidentReportValidation = [
	body("shiftId")
		.exists().withMessage("shiftId must be included")
		.isString().withMessage("shiftId must be a string")
];


export const generateIncidentReportValidation = [
	body("incidentReportId")
		.exists().withMessage("incidentReportId must be included")
		.isString().withMessage("incidentReportId must be a string"),
	body("incidentInfo")
		.exists().withMessage("incidentInfo must be included")
		.isString().withMessage("incidentInfo must be a string")
];


export const getMyIncidentsValidation = [
	query("skip")
		.optional()
		.isInt({ min: 0 }).withMessage("skip must be a non-negative integer")
		.toInt(),
	query("limit")
		.optional()
		.isInt({ min: 1, max: 100 }).withMessage("limit must be between 1 and 100")
		.toInt()
];


export const getAllIncidentsValidation = getMyIncidentsValidation;


export const getIncidentReportValidation = [
	param("incidentReportId")
		.exists().withMessage("incidentReportId param is required")
		.isString().withMessage("incidentReportId must be a string")
];


export const deleteIncidentReportValidation = [
	body("incidentReportId")
		.exists().withMessage("incidentReportId is required")
		.isString().withMessage("incidentReportId must be a string")
]
