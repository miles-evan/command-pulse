import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import AnnouncementsList from "@/components/announcements-and-messaging/AnnouncementsList.jsx";
import { useIsFocused } from "@react-navigation/native";


export default function Announcements() {
	
	const isFocused = useIsFocused();
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			<AnnouncementsList isFocused={isFocused}/>
			
		</SafeAreaViewWithBackground>
	);
}