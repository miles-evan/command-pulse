import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Pressable } from "react-native";
import * as shiftService from "@/services/shiftService.js";


export default function ClockInButton({ onPress }) {
	
	return (
		<Pressable style={{ alignItems: "center" }} onPress={onPress}>
			{({ pressed }) => (
				<>
					<MaterialIcons name="play-circle-outline" size={54} color={pressed? Colors.softAccent : Colors.accent} />
					<StyledText look={`24 medium ${pressed? "softAccent" : "accent"}`} style={{ marginVertical: -3 }}>Clock in</StyledText>
				</>
			)}
		</Pressable>
	);
	
}