import { Company } from "../mongoose/schemas/companySchema.js";
import { promoCodeExists } from "../queries/promoCodeQueries";


export async function generateUniqueCompanyInviteCode(): Promise<string> {
    return generateUniqueCode(async code =>
        !await Company.exists({ officerInviteCode: code }) && !await Company.exists({ supervisorInviteCode: code }));
}


export async function generateUniquePromoCode(): Promise<string> {
    return generateUniqueCode(promoCodeExists);
}


// generates random 8 digit unique code
function generateUniqueCode(isUnique:(code: string) => Promise<boolean>): string {
    let code: string;
    do {
        code = generateCode();
    } while(!isUnique(code));
    return code;
}


function generateCode(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}