import {useContext, useEffect, useState} from "react";
import StyledText from "@/components/StyledText";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import { asyncStorageAuthentication } from "@/utils/AsyncStorageAuthentication";
import { router } from "expo-router";
import { GlobalStateContext } from "@/utils/GlobalStateContext";
import Gap from "@/components/Gap";


// wrap this component around a screen that you need to be logged in to see. will show a loading screen while logging in
// and then once logged in will show children
export default function CheckAuthentication({ children }) {
	
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const globalState = useContext(GlobalStateContext);
	
	useEffect(() => {
		// authenticate
		(async () => {
			const companyName = await asyncStorageAuthentication();
			if(!companyName) return router.replace("/setup");
			globalState.companyName = companyName;
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