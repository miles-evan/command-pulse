import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import AnnouncementsList from "@/components/announcements-and-messaging/AnnouncementsList.jsx";
import { useIsFocused } from "@react-navigation/native";
import { useRef } from "react";
import MessageInput from "@/components/announcements-and-messaging/MessageInput.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import { KeyboardAvoidingView, Platform } from "react-native";


export default function Announcements() {
	
	const isFocused = useIsFocused();
	const sendMessageRef = useRef(null);
	const valueRef = useRef(null);
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			<KeyboardAvoidingView
				style={{ flex: 1, width: "90%", marginHorizontal: "auto", marginBottom: 60 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<AnnouncementsList
					isFocused={isFocused}
					sendMessageRef={sendMessageRef}
				/>
				<FlexRowSpaceBetween>
					<MessageInput valueRef={valueRef}/>
					<Button style={{ width: 64, marginHorizontal: 2 }} onPress={sendMessageRef.current}>Send</Button>
				</FlexRowSpaceBetween>
			</KeyboardAvoidingView>
			
		</SafeAreaViewWithBackground>
	);
	
}