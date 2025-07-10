import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import StyledText from "@/components/StyledText";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as shiftService from "@/services/shiftService";


export default function ClockOutButton({ shiftId }) {
	
	return (
		<Pressable style={{ alignItems: "center" }} onPress={() => shiftService.clockOut(shiftId)}>
			<MaterialCommunityIcons name="stop-circle-outline" size={54} color={Colors.danger} />
			<StyledText look="24 medium danger" style={{ marginVertical: -3 }}>Clock out</StyledText>
		</Pressable>
	);
	
}