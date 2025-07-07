import {Pressable, StyleSheet, Text} from "react-native";
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/StyledText";
import { router } from "expo-router";


export default function Button({ look="blue", width="90%", onPress=()=>{}, to, children }) {
	
	if(to) onPress = () => router.push(to);
	
	
	const styles = getStyles(look, width);
	
	
	return (
		<Pressable style={styles.button} onPress={onPress}>
			<StyledText look="20 semibold white" vCenter={true} style={styles.text}>
				{children}
			</StyledText>
		</Pressable>
	);
	
}


function getStyles(look, width) {
	return StyleSheet.create({
		button: {
			width: width,
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
		},
		
		text: {
			...{
				"blue": {
					color: Colors.white,
				},
				"white": {
					color: Colors.accent,
				}
			}[look],
		}
	});
}