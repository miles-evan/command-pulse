import { User } from "../mongoose/schemas/userSchema.js";
import { hashPassword } from "../utils/hashPassword.js";


export async function createUser(email, password, firstName, lastName, phoneNumber) {
    const newUser = new User({ email, password: hashPassword(password), firstName, lastName, phoneNumber });
    await newUser.save();
    return newUser;
}


export async function expandUserIdArray(userIds) {
    if(userIds.length === 0) return [];
    return User.aggregate([
        { $match: {
                _id: { $in: userIds }
            }},
        { $project: {
                userId: "$_id", firstName: 1, lastName: 1, _id: 0
            }}
    ]);
}