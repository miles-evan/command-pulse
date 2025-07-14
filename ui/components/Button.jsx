import {Pressable, StyleSheet, Text} from "react-native";
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/utility-components/StyledText.jsx";
import {router, useLocalSearchParams} from "expo-router";


export default function Button(
	{ look="blue", onPress=()=>{}, to, withParams={}, children, buttonStyle={}, textStyle={}, disabled }
) {
	
	const params = useLocalSearchParams();
	
	if(to) {
		onPress = () => router.push({
			pathname: to,
			params: { ...params, ...withParams }
		});
	}
	if(disabled)
		onPress = () => {};
	
	
	return (
		<Pressable
			style={({ pressed }) => getButtonStyles(look, buttonStyle, disabled || pressed)}
			onPress={onPress}
		>
			
			{({ pressed }) => (
				
				<StyledText
					look="20 semibold white"
					vCenter={true}
					style={getTextStyles(look, textStyle, disabled || pressed)}
				>
					{children}
				</StyledText>
				
			)}
			
		</Pressable>
	);
	
}


// --------------------------------


function getButtonStyles(look, buttonStyle, showFeedback) {
	return {
		width: "90%",
		height: 44,
		
		borderRadius: 48,
		
		marginHorizontal: "auto",
		marginVertical: 8,
		
		...{
			"blue": {
				backgroundColor: Colors.accent,
			},
			"white": {
				backgroundColor: Colors.verySoft,
				borderWidth: 1,
				borderColor: Colors.soft,
			}
		}[look],
		
		...buttonStyle
	}
}


function getTextStyles(look, textStyle, showFeedback) {
	return {
		color: look === "blue"? showFeedback? Colors.soft : Colors.white
			: look === "white"? showFeedback? Colors.softAccent : Colors.accent
				: "#000000",
		
		...textStyle
	}
}