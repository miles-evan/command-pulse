import * as asyncStorage from "@/utils/asyncStorage";
import * as userService from "@/services/userService";
import * as companyService from "@/services/companyService";


// THIS IS TEMPORARY
// Credentials will not be saved to the device like this in the future


// gets credentials from async storage and logs in user
// returns companyName if success and false if failure
export async function asyncStorageAuthentication() {
	const credentials = await asyncStorage.get("credentials");
	if(!credentials) return false;
	
	const response = await userService.login(credentials.email, credentials.password);
	if(!response.ok) return false;
	
	const { isInCompany, companyName } = (await companyService.status()).body;
	if(!isInCompany) return false;
	
	return companyName;
}


export async function storeCredentials(email, password) {
	await asyncStorage.store("credentials", { email, password });
}


export async function removeCredentialsAndLogOut() {
	await asyncStorage.remove("credentials");
	await userService.logout();
}