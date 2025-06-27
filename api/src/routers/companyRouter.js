import { Router } from "express";
import { checkIsAuthenticated, checkIsInCompany, checkIsSupervisor, checkNotInCompany } from "../utils/middleware.js";
import {
    createCompany,
    getCompanyName, getContacts, getInviteCodes,
    joinCompanyById,
    joinCompanyByInviteCode, leaveCompany, resetInviteCodes
} from "../queries/companyQueries.js";

const companyRouter = Router();

// --------------------------------


// middleware
companyRouter.use(checkIsAuthenticated);


// Create company
companyRouter.post(
    "/",
    checkNotInCompany,
    async (request, response) => {
        const { companyName } = request.body;
        try {
            const newCompany = await createCompany(companyName);
            await joinCompanyById(request.user.id, newCompany.id, "supervisor");
            return response.status(201).send({ companyId: newCompany.id });
        } catch ({ message }) {
            return response.status(400).send({ message });
        }
    }
);


// Get invite codes
companyRouter.get(
    "/invite-codes",
    checkIsInCompany,
    checkIsSupervisor,
    async (request, response) => {
        return response.send(await getInviteCodes(request.user.companyId));
    }
);


// Reset invite codes
companyRouter.post(
    "/invite-codes/reset",
    checkIsInCompany,
    checkIsSupervisor,
    async (request, response) => {
        const { companyId } = request.user;
        await resetInviteCodes(companyId);
        return response.send(await getInviteCodes(companyId));
    }
);


// Join company
companyRouter.post(
    "/join",
    checkNotInCompany,
    async (request, response) => {
        const { inviteCode } = request.body;
        const companyId = await joinCompanyByInviteCode(request.user.id, inviteCode);
        return response.send({ companyId });
    }
);


// Leave company
companyRouter.post(
    "/leave",
    async (request, response) => {
        await leaveCompany(request.user.id);
        return response.sendStatus(200);
    }
);


// Get contacts
companyRouter.get(
    "/contacts",
    checkIsInCompany,
    async (request, response) => {
        return response.send(await getContacts(request.user.companyId));
    }
);


// Get company status
companyRouter.get("/status", async (request, response) => {
    const { companyId } = request.user;

    if(companyId == null)
        return response.send({ isInCompany: false, message: "not in a company" });

    return response.send({
        isInCompany: true, companyId, companyName: await getCompanyName(companyId), message: "in company"
    });
});


// --------------------------------

export default companyRouter;