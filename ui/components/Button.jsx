import {Pressable, StyleSheet, Text} from "react-native";
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/StyledText";
import { router } from "expo-router";


export default function Button({ look="blue", onPress=()=>{}, to, children, buttonStyle={}, textStyle={} }) {
	
	if(to) onPress = () => router.push(to);
	
	
	const styles = getStyles(look, buttonStyle, textStyle);
	
	
	return (
		<Pressable style={styles.button} onPress={onPress}>
			<StyledText look="20 semibold white" vCenter={true} style={styles.text}>
				{children}
			</StyledText>
		</Pressable>
	);
	
}


function getStyles(look, buttonStyle, textStyle) {
	return StyleSheet.create({
		button: {
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
		},
		
		text: {
			color: look === "blue"? Colors.white
				: look === "white"? Colors.accent
				: "#000000",
			
			...textStyle
		}
	});
}