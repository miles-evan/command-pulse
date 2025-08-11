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
export async function getAnnouncements(companyId, date, skip, limit) {
	const company = await Company.findById(companyId);
	
	const announcements = await Message.find({
		_id: { $in: company.announcementIds },
		timeSent: { $lt: date },
	}).sort({ timeSent: -1 }).skip(skip).limit(limit);
	
	return projectMessages(announcements);
}


function projectMessages(messages) {
	return messages.map(message => ({
		messageId: message.id,
		userId: message.userId,
		timeSent: message.timeSent,
		message: message.message,
		numLikes: message.numLikes,
	}));
}