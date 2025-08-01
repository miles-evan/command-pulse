import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import * as React from "react";
import ShiftList from "@/components/scheduling/my-schedule/ShiftList.jsx";
import { router } from "expo-router";


export default function Create() {
	
	function onPressShift(shiftId) {
		// init incident
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<BackButton/>
			
			<StyledText
				look="22 medium mediumHard"
				hCenter={false}
				style={{ width: "90%", marginHorizontal: "auto", marginTop: 20 }}
			>
				When did the incident take place?
			</StyledText>
			
			<ShiftList dir={-1} showPressFeedback onPressShift={onPressShift}/>
		
		</SafeAreaViewWithBackground>
	);
	
}