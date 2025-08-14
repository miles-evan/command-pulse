import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { scheduleReminder } from "@/utils/notifications.js";
import Button from "@/components/project-specific-utility-components/Button.jsx";


export default function Messaging() {
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<StyledText look="24 semibold hard">This is a placeholder page</StyledText>
			
			<Button onPress={() => scheduleReminder("Bruh", "Shift soon!", new Date(Date.now() + 10 * 1000))}>Notify</Button>
		</SafeAreaViewWithBackground>
	);
}