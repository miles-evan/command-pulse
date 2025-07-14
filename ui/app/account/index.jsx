import TabHeader from "@/components/TabHeader";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import {removeCredentialsAndLogOut} from "@/utils/AsyncStorageAuthentication";
import { router } from "expo-router";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import Gap from "@/components/utility-components/Gap.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";


export default function Account() {
	
	async function logout() {
		await removeCredentialsAndLogOut();
		router.replace("/setup")
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<StyledText look="48 semibold veryHard">Account</StyledText>
			<StyledText look="24 semibold hard">This is a placeholder page</StyledText>
			<BackButton/>
			<Gap size={50}/>
			<Button onPress={logout}>Log out</Button>
		</SafeAreaViewWithBackground>
	);
	
}