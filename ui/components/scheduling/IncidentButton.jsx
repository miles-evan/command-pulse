import { Pressable } from "react-native";
import {Colors} from "@/constants/Colors";
import StyledText from "@/components/StyledText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";


export default function IncidentButton() {
	
	return (
		<Pressable style={{ alignItems: "center" }}>
			<Ionicons name="document-outline" size={54} color={Colors.accent} />
			<StyledText look="24 medium accent" style={{ marginVertical: -3 }}>Incident</StyledText>
		</Pressable>
	);
	
}