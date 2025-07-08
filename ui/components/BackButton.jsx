import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors";
import StyledText from "@/components/StyledText";
import { Pressable } from "react-native";
import { router } from "expo-router";


export default function BackButton() {
	
	return (
		<Pressable onPress={router.back} style={{ flexDirection: "row", marginHorizontal: 10 }}>
			
			<MaterialIcons name="arrow-back-ios" size={20} color={Colors.accent} />
			
			<StyledText look="18 light accent" hCenter={false} vCenter={true}>
				Back
			</StyledText>
			
		</Pressable>
	);
	
}