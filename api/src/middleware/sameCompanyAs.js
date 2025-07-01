import { usersInSameCompany } from "../queries/userQueries.js";
import { userInSameCompanyAsShift } from "../queries/shiftQueries.js";

export function sameCompanyAsUser(pathFromRequestToUserId) {
    const pathArray = pathFromRequestToUserId.split(".");

    return async (request, response, next) => {
        let userId = extractFromRequest(request, pathArray);
        if(!userId) return next();

        const sameCompany = await usersInSameCompany(request.user.id, userId);
        if(sameCompany) return next();

        return response.status(403).send({ message: "must be in the same company as user" });
    }
}

export function sameCompanyAsShift(pathFromRequestToShiftId) {
    const pathArray = pathFromRequestToShiftId.split(".");

    return async (request, response, next) => {
        let shiftId = extractFromRequest(request, pathArray);
        if(!shiftId) return next();

        const sameCompany = await userInSameCompanyAsShift(request.user.id, shiftId);
        if(sameCompany) return next();

        return response.status(403).send({ message: "must be in the same company as shift" });
    }
}

function extractFromRequest(request, pathArray) {
    let result = request;
    pathArray.forEach(attr => result = result[attr]);
    return result;
}