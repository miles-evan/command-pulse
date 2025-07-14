import React from "react";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { Pressable } from "react-native";
import Gap from "@/components/utility-components/Gap.jsx";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";


// shows the company name at the top
export default function TabHeader() {
	
	const { companyName } = useGlobalState();
	
	
	return (
		<Pressable onPress={() => router.push("/account")}>
			<StyledText look="40 medium veryHard" adjustsFontSizeToFit>{companyName}</StyledText>
			<Gap size={10}/>
		</Pressable>
	);
	
}