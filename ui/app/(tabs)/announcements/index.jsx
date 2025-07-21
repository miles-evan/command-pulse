import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import TimeRangeInput from "@/components/scheduling/company-schedule/day-view/TimeRangeInput.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";


export default function Announcements() {
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			<StyledText look="24 semibold hard">This is a placeholder page</StyledText>
			
		</SafeAreaViewWithBackground>
	);
}