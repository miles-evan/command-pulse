import { Router } from "express";
import { checkIsAuthenticated } from "../utils/middleware.js";
import { User } from "../mongoose/schemas/userSchema.js";
import { hashPassword } from "../utils/hashPassword.js";
import { Company } from "../mongoose/schemas/companySchema.js";
import { generateUniqueCode } from "../utils/inviteCodes.js";

const companyRouter = Router();

// --------------------------------


// middleware
companyRouter.use(checkIsAuthenticated);


// Create company
companyRouter.post("/", async (request, response) => {
    const { companyName } = request.body;
    const newCompany = new Company({
        name: companyName,
        supervisorInviteCode: await generateUniqueCode("supervisorInviteCode"),
        officerInviteCode: await generateUniqueCode("officerInviteCode")
    });
    try {
        await newCompany.save();
        response.status(201).send({ companyId: newCompany.id });
    } catch ({message}) {
        response.status(400).send({message});
    }
});


/*

Join company
path: “/api/v1/companies/join”
method: POST
access: logged into a user
request body: { joinCode }
query:
response body: { companyId }

Get join codes
path: "/api/v1/companies/join-codes"
method: GET
access: logged into a supervisor
request body:
query:
response body: { officerJoinCode, supervisorJoinCode }

Reset join codes
path: "/api/v1/companies/join-codes/reset"
method: POST
access: logged into supervisor
request body:
query:
response body: { officerJoinCode, supervisorJoinCode }

Get contacts in company
path: “api/v1/companies/contacts”
method: GET
access: logged into user who’s in a company
request body:
query:
response body: { supervisors, officers }
	each user is given as { userId, firstName, lastName }

 */

// --------------------------------

export default companyRouter;