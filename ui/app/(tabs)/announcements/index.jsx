import * as React from "react";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import AnnouncementsList from "@/components/announcements-and-messaging/AnnouncementsList.jsx";
import { useIsFocused } from "@react-navigation/native";
import { useRef } from "react";
import MessageInput from "@/components/announcements-and-messaging/MessageInput.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import LinearAnimatedView from "@/components/general-utility-components/LinearAnimatedView.jsx";
import SendMessageButton from "@/components/announcements-and-messaging/SendMessageButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import If from "@/components/general-utility-components/If.jsx";

export default function Announcements() {
	const isFocused = useIsFocused();
	const sendMessageRef = useRef(null);
	const valueRef = useRef(null);
	const setValueRef = useRef(null);
	const globalState = useGlobalState();
	
	function sendMessage() {
		sendMessageRef.current(valueRef.current);
		setValueRef.current("");
	}
	
	return (
		<SafeAreaViewWithBackground style={{ flex: 1 }}>
			<TabHeader />
			
			<KeyboardAvoidingView
				style={{ flex: 1, width: "90%", alignSelf: "center" }}
				behavior={Platform.OS === "ios"? "padding" : undefined}
			>
				<View style={{ flex: 1 }}>
					<AnnouncementsList isFocused={isFocused} sendMessageRef={sendMessageRef}/>
				</View>
				
				<If condition={globalState.isSupervisor}>
					<LinearAnimatedView>
						<FlexRowSpaceBetween style={{ paddingBottom: 8 }}>
							<MessageInput valueRef={valueRef} setValueRef={setValueRef}/>
							<Gap horizontal size={10}/>
							<SendMessageButton onPress={sendMessage}>Send</SendMessageButton>
						</FlexRowSpaceBetween>
					</LinearAnimatedView>
				</If>
			</KeyboardAvoidingView>
		</SafeAreaViewWithBackground>
	);
}
