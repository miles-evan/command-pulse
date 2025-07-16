import { Text, StyleSheet } from "react-native";
import { FontWeights } from "@/constants/Typography.js";
import { Colors } from "@/constants/Colors.js";


// lets you use a shortcut to style text with the look prop.
// look prop format: fontSize fontWeight color. ex: "12 semibold black"
// fontWeight should be a key from FontWeights from constants/Typography
// color should be a key from Colors from constants/Colors
export default function StyledText({ look="12 semibold black", hCenter=true, vCenter=false, style={}, children, ...rest }) {
	
	return (
		<Text style={getStyle(look, hCenter, vCenter, style)} { ...rest }>
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
	
	return { ...result, ...style };
}