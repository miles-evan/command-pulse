import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.js";
import { createUser, emailIsAvailable } from "../queries/userQueries.js";
import { validateRequest } from "../middleware/validate.js";
import { checkEmailAvailabilityValidation, loginValidation, signupValidation } from "../validation/userValidation.js";

const userRouter = Router();

// --------------------------------


// Sign up
userRouter.post(
    "/signup",
    ...validateRequest(signupValidation),
    async (request, response) => {
    const { email, password, firstName, lastName, phoneNumber } = request.body;
    try {
        const newUser = await createUser(email, password, firstName, lastName, phoneNumber)
        response.status(201).send({ userId: newUser.id });
    } catch({ message }) {
        response.status(400).send({ message });
    }
});


// Login
userRouter.post(
    "/login",
    ...validateRequest(loginValidation),
    passport.authenticate("local"),
    (request, response) => {
        response.send({ userId: request.user.id });
    }
);


// Logout
userRouter.post("/logout", (request, response) => {
    request.logout(console.log);
    response.sendStatus(200);
});


// Check email availability
userRouter.get(
    "/check-email/:email",
    validateRequest(checkEmailAvailabilityValidation),
    async (request, response) => {
        const { email } = request.params;
        
        const isAvailable = await emailIsAvailable(email);
        return response.send({ isAvailable });
    }
);


// Get login status
userRouter.get("/status", (request, response) => {
    if(!request.isAuthenticated())
        return response.send({ isLoggedIn: false, message: "Not logged in" });
    return response.send({
        isLoggedIn: true,
        message: `Logged into ${request.user.firstName}`,
        userId: request.user.id,
        firstName: request.user.firstName,
        lastName: request.user.lastName,
        isSupervisor: request.user.isSupervisor,
    });
});


// --------------------------------

export default userRouter;