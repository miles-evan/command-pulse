import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { scheduleReminder } from "@/utils/notifications.js";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import * as React from "react";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";


export default function Messaging() {
	return (
		<SafeAreaViewWithBackground>
			<TabHeader widthDivider/>
			
			<View style={{ width: "90%", marginHorizontal: "auto" }}>
				<Gap size={50}/>
				<StyledText look="46 semibold hard" style={{ textAlign: "center" }}>Direct messaging in development!</StyledText>
			</View>
			
		</SafeAreaViewWithBackground>
	);
}