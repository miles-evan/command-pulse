import {useContext, useEffect, useState} from "react";
import StyledText from "@/components/utility-components/StyledText.jsx";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import {asyncStorageAuthentication} from "@/utils/AsyncStorageAuthentication";
import {router} from "expo-router";
import Gap from "@/components/utility-components/Gap.jsx";
import * as userService from "@/services/userService.js";
import { useGlobalState } from "@/hooks/useGlobalState.js";


// wrap this component around a screen that you need to be logged in to see. will show a loading screen while logging in
// and then once logged in will show children
export default function CheckAuthentication({ children }) {
	
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const globalState = useGlobalState();
	
	useEffect(() => {
		// authenticate and store companyName and isSupervisor in global state
		(async () => {
			const companyName = await asyncStorageAuthentication();
			if(!companyName) return router.replace("/setup");
			globalState.companyName = companyName;

			globalState.isSupervisor = (await userService.status()).body.isSupervisor;

			setIsAuthenticated(true);
		})();
	}, []);
	
	
	return isAuthenticated? children : (
		<SafeAreaViewWithBackground>
			<Gap size={25}/>
			<StyledText look="68 semibold veryHard">Loading...</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
		</SafeAreaViewWithBackground>
	);

}