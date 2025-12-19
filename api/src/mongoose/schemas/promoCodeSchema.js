import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		unique: true,
	},
});

export const PromoCode = mongoose.model("PromoCode", promoCodeSchema);
