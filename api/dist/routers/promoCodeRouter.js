import { Router } from "express";
import "../strategies/local-strategy.js";
import { validateRequest } from "../middleware/validate.js";
import { createPromoCodes, getAllPromoCodes, promoCodeExists } from "../queries/promoCodeQueries.js";
import { createPromoCodesValidation, getAllPromoCodesValidation, promoCodeExistsValidation } from "../validation/promoCodeValidation.js";
const promoCodeRouter = Router();
// --------------------------------
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD)
    throw new Error("ADMIN_PASSWORD missing from .env");
const passwordMiddleware = (request, response, next) => {
    const password = request.query.adminPassword;
    if (password !== ADMIN_PASSWORD)
        return response.sendStatus(401);
    next();
};
// Get all promo codes
promoCodeRouter.get("/", ...validateRequest(getAllPromoCodesValidation), passwordMiddleware, async (_, response) => {
    const codes = await getAllPromoCodes();
    return response.send({ codes });
});
// Check if promo code exists
promoCodeRouter.get("/exists/:code", ...validateRequest(promoCodeExistsValidation), async (request, response) => {
    const code = request.params.code;
    const exists = await promoCodeExists(code);
    return response.send({ exists });
});
// Create promo codes
promoCodeRouter.post("/", ...validateRequest(createPromoCodesValidation), passwordMiddleware, async (request, response) => {
    const numCodes = request.body.numCodes;
    const codes = await createPromoCodes(numCodes);
    return response.status(201).send({ codes });
});
// --------------------------------
export default promoCodeRouter;
