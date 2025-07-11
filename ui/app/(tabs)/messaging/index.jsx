import { Text } from "react-native";
import TabHeader from "@/components/TabHeader";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";


export default function Messaging() {
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<StyledText look="24 semibold hard">This is a placeholder page</StyledText>
		</SafeAreaViewWithBackground>
	);
}