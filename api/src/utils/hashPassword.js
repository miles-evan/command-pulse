import bcrypt from "bcrypt";

// --------------------------------


const saltRounds = 10;

export function hashPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export function comparePasswords(plain, hashed) {
    return bcrypt.compareSync(plain, hashed);
}