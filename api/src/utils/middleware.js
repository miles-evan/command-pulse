import { validationResult } from "express-validator";

export function checkIsAuthenticated(request, response, next) {
    if(!("isAuthenticated" in request) || !request.isAuthenticated())
        return response.sendStatus(401);
    return next();
}

export function checkIsInCompany(request, response, next) {
    // assumes you're already authenticated
    if(request.user.companyId == null)
        return response.sendStatus(400);
    return next();
}

export function checkIsSupervisor(request, response, next) {
    // assumes you're already in a company
    if(!request.user.isSupervisor)
        return response.sendStatus(400);
    return next();
}

export function validateRequest(validationSchema) {
    return [...validationSchema, (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });
        next();
    }];
}