import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { Pressable } from "react-native";


export default function IconAndTextButton({ onPress, color="accent", pressColor="softAccent", text, iconName }) {
	
	return (
		<Pressable style={{ alignItems: "center" }} onPress={onPress}>
			{({ pressed }) => (
				<>
					<MaterialIcons name={iconName} size={54} color={pressed? Colors[pressColor] : Colors[color]} />
					<StyledText look={`24 medium ${pressed? pressColor : color}`} style={{ marginVertical: -3 }}>{text}</StyledText>
				</>
			)}
		</Pressable>
	);
	
}