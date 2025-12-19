import { Company } from "../mongoose/schemas/companySchema.js";
import { promoCodeExists } from "../queries/promoCodeQueries.js";
export async function generateUniqueCompanyInviteCode() {
    return generateUniqueCode(async (code) => !await Company.exists({ officerInviteCode: code }) && !await Company.exists({ supervisorInviteCode: code }));
}
export async function generateUniquePromoCode() {
    return generateUniqueCode(promoCodeExists);
}
// generates random 8 digit unique code
function generateUniqueCode(isUnique) {
    let code;
    do {
        code = generateCode();
    } while (!isUnique(code));
    return code;
}
function generateCode() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}
