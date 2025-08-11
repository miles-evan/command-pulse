import { Message } from "../mongoose/schemas/messageSchema.js";
import { Company } from "../mongoose/schemas/companySchema.js";
import { User } from "../mongoose/schemas/userSchema.js";
import { projectShifts } from "./shiftQueries.js";


export async function sendAnnouncement(userId, message) {
	const newAnnouncement = await createMessage(userId, message);
	
	const user = await User.findById(userId);
	await Company.findByIdAndUpdate(user.companyId, { $push: { announcementIds: newAnnouncement._id } });
	
	return newAnnouncement.id;
}


async function createMessage(userId, message) {
	const newMessage = new Message({ userId, message });
	await newMessage.save();
	
	return newMessage;
}


// --------------------------------


// returns announcements before date (exclusive)
export async function getAnnouncements(companyId, date=new Date(), skip=0, limit=10) {
	const company = await Company.findById(companyId);
	
	console.log({ companyId, date, skip, limit })
	
	const announcements = await Message.find({
		_id: { $in: company.announcementIds },
		timeSent: { $lt: date },
	}).sort({ timeSent: -1 }).skip(skip).limit(limit);
	
	return await projectMessages(announcements);
}


async function projectMessages(messages) {
	return Promise.all(messages.map(async message => {
		const user = await User.findById(message.userId);
		console.log(message)
		return {
			messageId: message.id,
			userId: message.userId,
			firstName: user.firstName,
			lastName: user.lastName,
			timeSent: message.timeSent,
			message: message.message,
			numLikes: message.numLikes,
		}
	}));
}