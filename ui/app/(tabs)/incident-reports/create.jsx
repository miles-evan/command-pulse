import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import * as React from "react";
import ShiftList from "@/components/scheduling/my-schedule/ShiftList.jsx";
import { router } from "expo-router";
import * as incidentReportService from "@/services/incidentReportService.js";
import { useState } from "react";
import If from "@/components/general-utility-components/If.jsx";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";


export default function Create() {
	
	const [incidentReportId, setIncidentReportId] = useState(null);
	
	
	async function onPressShift(shiftId) {
		const response = await incidentReportService.init(shiftId);
		setIncidentReportId((response.body.incidentReportId));
	}
	
	
	return (
		<SafeAreaViewWithBackground dismissKeyboardOnPress>
			<TabHeader/>
			<BackButton/>
			<Gap size={20}/>
			
			{!incidentReportId? (<>
				<StyledText
					look="22 medium mediumHard"
					hCenter={false}
					style={{ width: "90%", marginHorizontal: "auto", marginBottom: 20 }}
				>
					When did the incident take place?
				</StyledText>
				
				<ShiftList
					dir={-1}
					showPressFeedback
					onPressShift={onPressShift}
					mode="plain"
				/>
			</>) : (
				<View style={{ width: "90%", marginHorizontal: "auto" }}>
					<StyledText look="26 medium mediumHard" hCenter={false}>Description</StyledText>
					<StyledTextInput
						placeholder="Describe what happened in your own words..."
						bigMode
					/>
					<Button look="ai" style={{ width: "100%", marginTop: 20 }}>Generate with AI</Button>
				</View>
			)}
			
			
			
		</SafeAreaViewWithBackground>
	);
	
}