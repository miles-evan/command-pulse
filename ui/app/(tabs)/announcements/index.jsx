import * as React from "react";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import AnnouncementsList from "@/components/announcements-and-messaging/AnnouncementsList.jsx";
import { useIsFocused } from "@react-navigation/native";
import { useRef } from "react";
import MessageInput from "@/components/announcements-and-messaging/MessageInput.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import SpringyAnimatedView from "@/components/general-utility-components/SpringyAnimatedView.jsx";
import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";
import LinearAnimatedView from "@/components/general-utility-components/LinearAnimatedView.jsx";

export default function Announcements() {
	const isFocused = useIsFocused();
	const sendMessageRef = useRef(null);
	const valueRef = useRef(null);
	
	function sendMessage() {
		sendMessageRef.current(valueRef.current);
	}
	
	return (
		<SafeAreaViewWithBackground style={{ flex: 1 }}>
			<TabHeader />
			
			<KeyboardAvoidingView
				style={{ flex: 1, width: "90%", alignSelf: "center" }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<View style={{ flex: 1 }}>
					<AnnouncementsList isFocused={isFocused} sendMessageRef={sendMessageRef} />
				</View>
				
				<LinearAnimatedView>
					<FlexRowSpaceBetween style={Platform.select({ android: { paddingBottom: 8 }, ios: {} })}>
						<MessageInput valueRef={valueRef} />
						<Button style={{ width: 64, marginHorizontal: 2 }} onPress={sendMessage}>Send</Button>
					</FlexRowSpaceBetween>
				</LinearAnimatedView>
			</KeyboardAvoidingView>
		</SafeAreaViewWithBackground>
	);
}
