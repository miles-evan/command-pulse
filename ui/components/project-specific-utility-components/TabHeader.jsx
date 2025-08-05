import React from "react";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Pressable } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import ConnectionStatus from "@/components/project-specific-utility-components/ConnectionStatus.jsx";


// shows the company name at the top
export default function TabHeader() {
	
	const { companyName } = useGlobalState();
	
	
	return (
		<Pressable onPress={() => router.push("/account")}>
			<StyledText look="40 medium veryHard" numberOfLines={1} adjustsFontSizeToFit>{companyName}</StyledText>
			<ConnectionStatus pingInterval={1000}/>
			<Gap size={10}/>
		</Pressable>
	);
	
}