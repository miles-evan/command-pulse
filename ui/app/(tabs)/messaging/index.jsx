import { Text } from "react-native";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";


export default function Messaging() {
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<StyledText look="24 semibold hard">This is a placeholder page</StyledText>
		</SafeAreaViewWithBackground>
	);
}