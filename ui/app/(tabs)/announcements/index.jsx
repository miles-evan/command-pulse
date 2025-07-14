import TabHeader from "@/components/TabHeader";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/utility-components/StyledText.jsx";


export default function Announcements() {
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<StyledText look="24 semibold hard">This is a placeholder page</StyledText>
		</SafeAreaViewWithBackground>
	);
}