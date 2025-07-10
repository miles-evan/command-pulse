import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors";
import StyledText from "@/components/StyledText";
import { Pressable } from "react-native";
import * as shiftService from "@/services/shiftService";


export default function ClockInButton({ shiftId }) {
	
	return (
		<Pressable style={{ alignItems: "center" }} onPress={() => shiftService.clockIn(shiftId)}>
			<MaterialIcons name="play-circle-outline" size={54} color={Colors.accent} />
			<StyledText look="24 medium accent" style={{ marginVertical: -3 }}>Clock in</StyledText>
		</Pressable>
	);
	
}