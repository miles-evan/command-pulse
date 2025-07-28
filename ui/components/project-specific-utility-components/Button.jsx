import {Pressable, StyleSheet, Text} from "react-native";
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import {router, useLocalSearchParams} from "expo-router";
import { FontWeights } from "@/constants/Typography.js";


export default function Button(
	{ look="blue", onPress=()=>{}, to, withParams={}, children, style={}, buttonStyle={}, textStyle={}, disabled }
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
			style={({ pressed }) => getButtonStyles(look, {...style, ...buttonStyle}, disabled || pressed)}
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
			},
			"lightBlue" : {
				backgroundColor: Colors.accent + "cc",
				borderWidth: 2,
				borderColor: Colors.verySoft,
			},
			"graySmall": {
				width: undefined,
				height: undefined,
				marginHorizontal: undefined,
				alignSelf: "flex-start",
				flexShrink: 1,
				backgroundColor: Colors.softer,
				borderRadius: 5,
				borderWidth: 1,
				borderColor: Colors.mediumSoft,
				padding: 7,
			}
		}[look],
		
		...buttonStyle
	}
}


function getTextStyles(look, textStyle, showFeedback) {
	return {
		color: look === "blue"? showFeedback? Colors.soft : Colors.white
			: look === "white"? showFeedback? Colors.softAccent : Colors.accent
			: look === "lightBlue"? showFeedback? Colors.soft : Colors.white
			: look === "graySmall"? showFeedback? Colors.mediumSoft : Colors.medium
			: "#000000",
		
		...{
			"graySmall": {
				fontWeight: FontWeights.regular,
			}
		}[look],
		
		...textStyle
	}
}