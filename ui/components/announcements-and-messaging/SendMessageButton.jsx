import { Pressable, View } from "react-native";
import { Colors } from "@/constants/Colors.js";
import Feather from '@expo/vector-icons/Feather';


export default function SendMessageButton({ onPress }) {
	
	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<View
					style={{
						width: 50,
						height: 50,
						paddingRight: 3,
						paddingTop: 2,
						borderRadius: 48,
						backgroundColor: Colors.verySoft,
						borderWidth: 3,
						borderColor: pressed? Colors.softAccent : Colors.accent,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Feather name="send" size={28} color={pressed? Colors.softAccent : Colors.accent}/>
				</View>
			)}
		</Pressable>
	);
	
}