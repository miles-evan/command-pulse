import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Pressable } from "react-native";
import { router } from "expo-router";


export default function BackButton() {
	
	return (
		<Pressable onPress={router.back} style={{ flexDirection: "row", marginHorizontal: 10 }}>
			
			<MaterialIcons name="arrow-back-ios" size={24} color={Colors.accent} />
			
			<StyledText look="19 regular accent" hCenter={false} vCenter={true} style={{ marginLeft: -4 }}>
				Back
			</StyledText>
			
		</Pressable>
	);
	
}