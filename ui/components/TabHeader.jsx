import React, { useContext } from "react";
import { GlobalStateContext } from "@/utils/GlobalStateContext";
import StyledText from "@/components/StyledText";
import { Pressable } from "react-native";
import Gap from "@/components/Gap";
import { router } from "expo-router";


// shows the company name at the top
export default function TabHeader() {
	
	const { companyName } = useContext(GlobalStateContext);
	
	
	return (
		<Pressable onPress={() => router.push("/account")}>
			<StyledText look="40 medium veryHard" adjustsFontSizeToFit>{companyName}</StyledText>
			<Gap size={10}/>
		</Pressable>
	);
	
}