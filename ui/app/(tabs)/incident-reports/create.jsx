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


export default function Create() {
	
	const [incidentReportId, setIncidentReportId] = useState(null);
	
	
	async function onPressShift(shiftId) {
		const response = await incidentReportService.init(shiftId);
		setIncidentReportId((response.body.incidentReportId));
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<BackButton/>
			
			{!incidentReportId? (<>
				<StyledText
					look="22 medium mediumHard"
					hCenter={false}
					style={{ width: "90%", marginHorizontal: "auto", marginVertical: 20 }}
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
				<StyledText>Bruh</StyledText>
			)}
			
			
			
		</SafeAreaViewWithBackground>
	);
	
}