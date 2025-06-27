import passport from "passport";
import { Strategy } from "passport-local";
import { comparePasswords } from "../utils/hashPassword.js";
import { User } from "../mongoose/schemas/userSchema.js";

// --------------------------------


export default passport.use(new Strategy({ usernameField: "email" }, async (email, password, done) => {
    const findUser = await User.findOne({ email });
    if(!findUser || !comparePasswords(password, findUser.password))
        return done(null, false, { message: "incorrect username or password" })
    return done(null, findUser);
}));

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const findUser = await User.findById(id);
    if(!findUser) return done(null, false, { message: "not logged in" });
    return done(null, findUser);
})