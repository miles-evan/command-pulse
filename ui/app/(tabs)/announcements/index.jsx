import TabHeader from "@/components/TabHeader";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/utility-components/StyledText.jsx";
import TimeRangeInput from "@/components/scheduling/company-schedule/TimeRangeInput.jsx";
import StyledTextInput from "@/components/StyledTextInput.jsx";


export default function Announcements() {
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			<StyledText look="24 semibold hard">This is a placeholder page</StyledText>
			
			<StyledTextInput initialValue="hi"/>
			
		</SafeAreaViewWithBackground>
	);
}