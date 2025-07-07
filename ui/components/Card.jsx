import { View } from "react-native";
import { StyleSheet } from "react-native";


export default function Card({ children, style }) {
	
	return (
		<View style={getStyles(style).card}>
			{children}
		</View>
	)
	
}


function getStyles(style) {
	return StyleSheet.create({
		card: {
			width: "90%",
			marginHorizontal: "auto",
			marginVertical: 16,
			
			paddingHorizontal: 16,
			paddingVertical: 24,
			
			backgroundColor: "rgba(255, 255, 255, 0.75)",
			
			borderRadius: 16,
			borderWidth: 1,
			borderColor: "#C7C7C7",
			
			...style,
		}
	});
}