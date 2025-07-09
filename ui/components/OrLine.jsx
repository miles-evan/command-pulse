import { View } from "react-native";
import HorizontalLine from "@/components/HorizontalLine";
import StyledText from "@/components/StyledText";


export default function OrLine({ length="90%", thickness=1, color="mediumSoft", style }) {
	
	return (
		<View style={{ flexDirection: "row", width: length, marginHorizontal: "auto", ...style }}>
			<HorizontalLine thickness={thickness} color={color} style={{ flex: 1 }}/>
			<StyledText look="16 light medium" vCenter style={{ marginHorizontal: 6 }}>OR</StyledText>
			<HorizontalLine thickness={thickness} color={color} style={{ flex: 1 }}/>
		</View>
	);
	
}