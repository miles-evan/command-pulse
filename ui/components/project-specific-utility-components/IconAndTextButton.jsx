import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Pressable, View } from "react-native";


export default function IconAndTextButton({ onPress, color="accent", pressColor="softAccent", text, iconName, style={} }) {
	
	return (
		<Pressable style={{ alignItems: "center" }} onPress={onPress}>
			{({ pressed }) => (
				<View style={{ alignItems: "center", ...style }}>
					<MaterialIcons name={iconName} size={54} color={pressed? Colors[pressColor] : Colors[color]} />
					<StyledText look={`24 medium ${pressed? pressColor : color}`} style={{ marginVertical: -3 }}>{text}</StyledText>
				</View>
			)}
		</Pressable>
	);
	
}