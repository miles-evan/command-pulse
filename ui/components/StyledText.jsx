import { Text, StyleSheet } from "react-native";
import { FontWeights } from "@/constants/Typography";
import { Colors } from "@/constants/Colors";


export default function StyledText({ look="12 semibold black", hCenter=true, vCenter=false, style={}, children }) {
	
	return (
		<Text style={getStyle(look, hCenter, vCenter, style)}>
			{children}
		</Text>
	);
	
}

function getStyle(look, hCenter, vCenter, style) {
	look = look.split(" ");
	
	const result = {
		fontSize: look[0],
		fontWeight: FontWeights[look[1]],
		color: Colors[look[2]],
		
		marginVertical: 5,
	};
	
	if(hCenter) result.marginHorizontal = "auto";
	if(vCenter) result.marginVertical = "auto";
	
	return StyleSheet.create({ ...result, ...style });
}