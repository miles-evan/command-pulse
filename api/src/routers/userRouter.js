import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.js";
import {createUser} from "../queries/userQueries.js";

const userRouter = Router();

// --------------------------------


// Sign up
userRouter.post("/signup", async (request, response) => {
    const { email, password, firstName, lastName, phoneNumber } = request.body;
    try {
        const newUser = await createUser(email, password, firstName, lastName, phoneNumber)
        response.status(201).send({ userId: newUser.id });
    } catch({ message }) {
        response.status(400).send({ message });
    }
});


// Login
userRouter.post("/login",
    passport.authenticate("local"),
    (request, response) => {
        response.send({ userId: request.user.id });
    }
);


// Logout
userRouter.post("/logout",(request, response) => {
    request.logout(console.log);
    response.sendStatus(200);
});


// Get login status
userRouter.get("/status", (request, response) => {
    if(!request.isAuthenticated())
        return response.send({ isLoggedIn: false, message: "Not logged in" });
    return response.send({ isLoggedIn: true, message: `Logged into ${request.user.firstName}`, userId: request.user.id });
});


// --------------------------------

export default userRouter;