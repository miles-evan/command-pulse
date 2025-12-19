import { PromoCode } from "../mongoose/schemas/promoCodeSchema.js";
import { generateUniquePromoCode } from "../utils/uniqueCodes.js";
export async function getAllPromoCodes() {
    const promoCodes = await PromoCode.find();
    return promoCodes.map(promoCode => promoCode.code);
}
export async function promoCodeExists(code) {
    return !!await PromoCode.exists({ code: code });
}
export async function createPromoCodes(numCodes) {
    const codes = await Promise.all(Array.from({ length: numCodes }, () => generateUniquePromoCode()));
    for (const code of codes) {
        await new PromoCode({ code }).save();
    }
    return codes;
}
export async function deletePromoCode(code) {
    await PromoCode.deleteOne({ code: code });
}
