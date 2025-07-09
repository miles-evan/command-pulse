import React, { useContext } from "react";
import { GlobalStateContext } from "@/utils/GlobalStateContext";
import StyledText from "@/components/StyledText";
import { Pressable } from "react-native";
import { removeCredentialsAndLogOut } from "@/utils/AsyncStorageAuthentication";
import { router } from "expo-router";


export default function TabHeader() {
	
	const { companyName } = useContext(GlobalStateContext);
	
	
	async function logout() {
		await removeCredentialsAndLogOut();
		router.replace("/setup")
	}
	
	
	return (
		<Pressable onPress={logout}>
			<StyledText look="40 medium veryHard" adjustsFontSizeToFit>{companyName}</StyledText>
		</Pressable>
	);
	
}