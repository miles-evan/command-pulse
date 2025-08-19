import { useEffect, useState } from "react";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import { asyncStorageAuthentication } from "@/utils/AsyncStorageAuthentication";
import {router} from "expo-router";
import * as userService from "@/services/userService.js";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import loadingScreen from "@/assets/images/loading-screen.png";
import { Image } from "react-native";

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

			const userStatus = (await userService.status()).body;
			globalState.isSupervisor = userStatus.isSupervisor;
			globalState.firstName = userStatus.firstName;
			globalState.lastName = userStatus.lastName;
			globalState.userId = userStatus.userId;

			setIsAuthenticated(true);
		})();
	}, []);
	
	
	return isAuthenticated? (
		children
	) : (
		<SafeAreaViewWithBackground
			dismissKeyboardOnPress={false}
			backgroundImageComponent={
				<Image
					source={loadingScreen}
					resizeMode="contain"
					style={{ alignSelf: "center", justifyContent: "center" }}
				/>
			}
		>
		{/*	Should there be children? */}
		</SafeAreaViewWithBackground>
	);

}