import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import {removeCredentialsAndLogOut} from "@/utils/AsyncStorageAuthentication";
import { router } from "expo-router";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { useState } from "react";


export default function Account() {
	
	const globalState = useGlobalState();
	const [loading, setLoading] = useState(false);
	
	
	async function logout() {
		setLoading(true);
		await removeCredentialsAndLogOut();
		globalState.reset();
		router.replace("/setup")
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<StyledText look="48 semibold veryHard">Account</StyledText>
			<BackButton/>
			
			<Gap size={25}/>
			<StyledText look="24 semibold hard">
				{`Logged into: ${globalState.firstName} ${globalState.lastName}`}
			</StyledText>
			<Button look="danger" onPress={logout} disabled={loading}>Log out</Button>
		</SafeAreaViewWithBackground>
	);
	
}