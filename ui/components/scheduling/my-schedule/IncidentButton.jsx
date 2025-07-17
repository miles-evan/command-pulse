import { Pressable } from "react-native";
import {Colors} from "@/constants/Colors.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";


export default function IncidentButton({ onPress }) {
	
	return (
		<Pressable style={{ alignItems: "center" }} onPress={onPress}>
			{({ pressed }) => (
				<>
					<Ionicons name="document-outline" size={54} color={pressed? Colors.softAccent : Colors.accent} />
					<StyledText look={`24 medium ${pressed? "softAccent" : "accent"}`} style={{ marginVertical: -3 }}>Incident</StyledText>
				</>
			)}
		</Pressable>
	);
	
}