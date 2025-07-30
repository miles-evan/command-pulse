import { User } from "../mongoose/schemas/userSchema.js";
import { hashPassword } from "../utils/hashPassword.js";


export async function createUser(email, password, firstName, lastName, phoneNumber) {
	const newUser = new User({ email, password: hashPassword(password), firstName, lastName, phoneNumber });
	await newUser.save();
	return newUser;
}


export async function emailIsAvailable(email) {
	return !await User.findOne({ email: email });
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

export async function usersInSameCompany(userId1, userId2) {
	const user1 = await User.findById(userId1);
	const user2 = await User.findById(userId2);
	return user1.companyId.equals(user2.companyId);
}