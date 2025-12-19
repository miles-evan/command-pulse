import BetterFetch from "../utils/BetterFetch.js";
import { API_URL } from "@/constants/apiUrl.js";


const rootURL = API_URL + "/promo-codes";

// check promo code
export const checkPromoCode = (promoCode: string) =>
	BetterFetch.get(rootURL + `/exists/${promoCode}`);