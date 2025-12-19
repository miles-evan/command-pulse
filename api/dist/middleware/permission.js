// when using permission, spread it like ...permission("supervisor")
export function permission(permission) {
    switch (permission) {
        case "logged in":
            return [checkIsAuthenticated];
        case "in company":
            return [checkIsAuthenticated, checkIsInCompany];
        case "not in company":
            return [checkIsAuthenticated, checkNotInCompany];
        case "supervisor":
            return [checkIsAuthenticated, checkIsInCompany, checkIsSupervisor];
        default:
            return [];
    }
}
function checkIsAuthenticated(request, response, next) {
    if (!("isAuthenticated" in request) || !request.isAuthenticated())
        return response.sendStatus(401);
    return next();
}
function checkIsInCompany(request, response, next) {
    // assumes you're already authenticated
    if (request.user.companyId == null)
        return response.status(403).send({ message: "must be in a company" });
    return next();
}
function checkNotInCompany(request, response, next) {
    // assumes you're already authenticated
    if (request.user.companyId == null)
        return next();
    return response.status(403).send({ message: "can't be in a company" });
}
function checkIsSupervisor(request, response, next) {
    // assumes you're already in a company
    if (!request.user.isSupervisor)
        return response.status(403).send({ message: "must be a supervisor" });
    return next();
}
