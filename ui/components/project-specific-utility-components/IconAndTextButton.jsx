import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Pressable, View } from "react-native";
import If from "@/components/general-utility-components/If.jsx";


export default function IconAndTextButton({
	onPress, color="accent", pressColor="softAccent", text, iconName, size=54, style, innerContainerStyle={}, outerContainerStyle={}
}) {
	
	return (
		<Pressable style={{ alignItems: "center", ...style, ...outerContainerStyle }} onPress={onPress}>
			{({ pressed }) => (
				<View style={{ alignItems: "center", ...innerContainerStyle }}>
					<MaterialIcons name={iconName} size={size} color={pressed? Colors[pressColor] : Colors[color]} />
					<If condition={text}>
						<StyledText look={`24 medium ${pressed? pressColor : color}`} style={{ marginVertical: -3 }}>{text}</StyledText>
					</If>
				</View>
			)}
		</Pressable>
	);
	
}