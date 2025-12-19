import { Router } from "express";
import "../strategies/local-strategy.js";
import { validateRequest } from "../middleware/validate.js";
import { createPromoCodes, getAllPromoCodes, promoCodeExists } from "../queries/promoCodeQueries";
import {
	createPromoCodesValidation,
	getAllPromoCodesValidation,
	promoCodeExistsValidation
} from "../validation/promoCodeValidation";

const promoCodeRouter = Router();

// --------------------------------


const ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD;


const passwordMiddleware = (request, response, next) => {
	const password = request.query.adminPassword as string;
	if(password !== ADMIN_PASSWORD) return response.sendStatus(401);
	next();
};


// Get all promo codes
promoCodeRouter.get(
	"/",
	...validateRequest(getAllPromoCodesValidation),
	passwordMiddleware,
	async (_, response) => {
		const codes: string[] = await getAllPromoCodes();
		return response.send({ codes });
	}
);


// Check if promo code exists
promoCodeRouter.get(
	"/exists/:code",
	...validateRequest(promoCodeExistsValidation),
	passwordMiddleware,
	async (request, response) => {
		const code: string = request.params.code;
		const exists: boolean = await promoCodeExists(code);
		return response.send({ exists });
	}
);


// Create promo codes
promoCodeRouter.post(
	"/",
	...validateRequest(createPromoCodesValidation),
	passwordMiddleware,
	async (request, response) => {
		const numCodes: number = request.body.numCodes;
		const codes: string[] = await createPromoCodes(numCodes);
		return response.status(201).send({ codes });
	}
);


// --------------------------------

export default promoCodeRouter;