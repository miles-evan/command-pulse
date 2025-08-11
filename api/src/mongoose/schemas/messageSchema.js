import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	// sender:
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	timeSent: {
		type: Date,
		default: Date.now,
	},
	message: {
		type: String,
		required: true,
	},
	// only for announcements:
	numLikes: {
		type: Number,
		default: 0,
	},
});

export const Message = mongoose.model("Message", messageSchema);
