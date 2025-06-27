import { Company } from "../mongoose/schemas/companySchema.js";

// generates random 8 digit unique code
export async function generateUniqueCode(fieldName) {
    while(true) {
        const code = Math.floor(10000000 + Math.random() * 90000000).toString();
        if(!await Company.exists({ [fieldName]: code })) return code;
    }
}
