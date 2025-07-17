import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as shiftService from "@/services/shiftService.js";


export default function ClockOutButton({ onPress }) {
	
	
	return (
		<Pressable style={{ alignItems: "center" }} onPress={onPress}>
			{({ pressed }) => (
				<>
					<MaterialCommunityIcons name="stop-circle-outline" size={54} color={pressed? Colors.softDanger : Colors.danger} />
					<StyledText look={`24 medium ${pressed? "softDanger" : "danger"}`} style={{ marginVertical: -3 }}>Clock out</StyledText>
				</>
			)}
		</Pressable>
	);
	
}