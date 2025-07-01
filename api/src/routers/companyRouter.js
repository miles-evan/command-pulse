import { Router } from "express";
import { permission } from "../middleware/permission.js";
import {
    createCompany, joinCompanyById, joinCompanyByInviteCode, leaveCompany,
    getCompanyName, getContacts, getInviteCodes, resetInviteCodes
} from "../queries/companyQueries.js";

const companyRouter = Router();

// --------------------------------


// Create company
companyRouter.post(
    "/",
    ...permission("not in company"),
    async (request, response) => {
        const { companyName } = request.body;
        try {
            const newCompany = await createCompany(companyName, request.user.id);
            return response.status(201).send({ companyId: newCompany.id });
        } catch ({ message }) {
            return response.status(400).send({ message });
        }
    }
);


// Get invite codes
companyRouter.get(
    "/invite-codes",
    ...permission("supervisor"),
    async (request, response) => {
        return response.send(await getInviteCodes(request.user.companyId));
    }
);


// Reset invite codes
companyRouter.post(
    "/invite-codes/reset",
    ...permission("supervisor"),
    async (request, response) => {
        const { companyId } = request.user;
        await resetInviteCodes(companyId);
        return response.send(await getInviteCodes(companyId));
    }
);


// Join company
companyRouter.post(
    "/join",
    ...permission("not in company"),
    async (request, response) => {
        const { inviteCode } = request.body;
        const companyId = await joinCompanyByInviteCode(request.user.id, inviteCode);
        return response.send({ companyId });
    }
);


// Leave company
companyRouter.post(
    "/leave",
    ...permission("in company"),
    async (request, response) => {
        await leaveCompany(request.user.id);
        return response.sendStatus(200);
    }
);


// Get contacts
companyRouter.get(
    "/contacts",
    ...permission("in company"),
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