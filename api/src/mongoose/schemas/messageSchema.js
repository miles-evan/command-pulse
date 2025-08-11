import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	sender: {
		type: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		required: true,
	},
	timeSent: {
		type: Date,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	numLikes: {
		types: Number,
		default: 0,
	},
});

export const Message = mongoose.model("Message", messageSchema);
