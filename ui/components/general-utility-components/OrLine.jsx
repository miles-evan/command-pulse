import { View } from "react-native";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";


export default function OrLine(
	{ length="90%", thickness=1, color="mediumSoft", style={}, containerStyle={}, lineStyle={}, textStyle={} }
) {
	
	return (
		<View style={{ flexDirection: "row", width: length, marginHorizontal: "auto", ...style, ...containerStyle }}>
			<HorizontalLine thickness={thickness} color={color} style={{ flex: 1, ...lineStyle }}/>
			<StyledText look="16 light medium" vCenter style={{ marginHorizontal: 6, ...textStyle }}>OR</StyledText>
			<HorizontalLine thickness={thickness} color={color} style={{ flex: 1, ...lineStyle }}/>
		</View>
	);
	
}