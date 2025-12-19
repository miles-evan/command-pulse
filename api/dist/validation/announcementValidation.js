import { body, query } from "express-validator";
export const sendAnnouncementValidation = [
    body("message")
        .exists().withMessage("message is required")
        .isString().withMessage("message must be a string")
        .trim()
        .isLength({ min: 1, max: 500 }).withMessage("message must be 1–500 characters"),
];
export const getAnnouncementsValidation = [
    query("date")
        .optional()
        .isISO8601().withMessage("date must be a valid ISO 8601 date-time string")
        .toDate(),
    query("skip")
        .optional()
        .isInt({ min: 0 }).withMessage("skip must be a non-negative integer")
        .toInt(),
    query("limit")
        .optional()
        .isInt({ min: 1, max: 50 }).withMessage("limit must be an integer between 1 and 50")
        .toInt(),
];
