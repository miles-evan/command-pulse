import { Router } from "express";
import { permission } from "../middleware/permission.js";
import { createCompany, joinCompanyByInviteCode, leaveCompany, getCompanyName, getContacts, getInviteCodes, resetInviteCodes, checkInviteCode, checkCompanyNameAvailability } from "../queries/companyQueries.js";
import { validateRequest } from "../middleware/validate.js";
import { checkCompanyNameAvailabilityValidation, checkInviteCodeValidation, createCompanyValidation, joinCompanyValidation, removeUserValidation } from "../validation/companyValidation.js";
import { sameCompanyAsUser } from "../middleware/sameCompanyAs.js";
import { deletePromoCode, promoCodeExists } from "../queries/promoCodeQueries.js";
const companyRouter = Router();
// --------------------------------
// Create company
companyRouter.post("/", ...validateRequest(createCompanyValidation), ...permission("not in company"), async (request, response) => {
    const { companyName, promoCode } = request.body;
    if (!await promoCodeExists(promoCode))
        return response.status(401).send("promo code incorrect");
    await deletePromoCode(promoCode);
    try {
        const newCompany = await createCompany(companyName, request.user.id);
        return response.status(201).send({ companyId: newCompany.id });
    }
    catch ({ message }) {
        return response.status(400).send({ message });
    }
});
// Get invite codes
companyRouter.get("/invite-codes", ...permission("supervisor"), async (request, response) => {
    return response.send(await getInviteCodes(request.user.companyId));
});
// Reset invite codes
companyRouter.post("/invite-codes/reset", ...permission("supervisor"), async (request, response) => {
    const { companyId } = request.user;
    await resetInviteCodes(companyId);
    return response.send(await getInviteCodes(companyId));
});
// Check invite code
companyRouter.get("/invite-codes/check/:inviteCode", ...validateRequest(checkInviteCodeValidation), async (request, response) => {
    const { inviteCode } = request.params;
    const isValid = await checkInviteCode(inviteCode);
    return response.send({ isValid });
});
// Join company
companyRouter.post("/join", ...validateRequest(joinCompanyValidation), ...permission("not in company"), async (request, response) => {
    const { inviteCode } = request.body;
    const companyId = await joinCompanyByInviteCode(request.user.id, inviteCode);
    return response.send({ companyId });
});
// Leave company
companyRouter.post("/leave", ...permission("in company"), async (request, response) => {
    await leaveCompany(request.user.id);
    return response.sendStatus(200);
});
// Get contacts
companyRouter.get("/contacts", ...permission("in company"), async (request, response) => {
    return response.send(await getContacts(request.user.companyId));
});
// Check company name availability
companyRouter.get("/check-name/:companyName", ...validateRequest(checkCompanyNameAvailabilityValidation), async (request, response) => {
    const { companyName } = request.params;
    const isAvailable = await checkCompanyNameAvailability(companyName);
    return response.send({ isAvailable });
});
// Remove user from company
companyRouter.post("/remove/:userId", ...validateRequest(removeUserValidation), ...permission("supervisor"), sameCompanyAsUser("params.userId"), async (request, response) => {
    const { userId } = request.params;
    await leaveCompany(userId);
    return response.sendStatus(200);
});
// Get company status
companyRouter.get("/status", async (request, response) => {
    if (!request.isAuthenticated())
        return response.send({ isInCompany: false, message: "not in a company" });
    const { companyId } = request.user;
    if (companyId == null)
        return response.send({ isInCompany: false, message: "not in a company" });
    return response.send({
        isInCompany: true, companyId, companyName: await getCompanyName(companyId), message: "in company"
    });
});
// --------------------------------
export default companyRouter;
