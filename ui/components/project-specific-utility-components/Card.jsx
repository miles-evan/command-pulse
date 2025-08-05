import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Colors.js";


export default function Card({ children, style, onPress=_=>{}, showPressFeedback=false }) {
	
	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<View
					style={{
						width: "90%",
						marginHorizontal: "auto",
						marginVertical: 16,
						
						paddingHorizontal: 16,
						paddingVertical: 24,
						
						backgroundColor: "rgba(255, 255, 255, 0.75)",
						
						borderRadius: 16,
						borderWidth: 1,
						borderColor: pressed && showPressFeedback? Colors.medium : Colors.soft,
						
						...style,
					}}
				>
					{children}
				</View>
			)}
		</Pressable>
	)
	
}
