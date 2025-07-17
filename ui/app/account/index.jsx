import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import {removeCredentialsAndLogOut} from "@/utils/AsyncStorageAuthentication";
import { router } from "expo-router";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";


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