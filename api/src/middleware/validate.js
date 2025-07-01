import { validationResult } from "express-validator";


export function validateRequest(validationSchema) {
    return [...validationSchema, (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        next();
    }];
}