import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import * as React from "react";
import ShiftList from "@/components/scheduling/my-schedule/ShiftList.jsx";
import { router, useLocalSearchParams } from "expo-router";
import * as incidentReportService from "@/services/incidentReportService.js";
import { useEffect, useRef, useState } from "react";
import If from "@/components/general-utility-components/If.jsx";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import GenerateWithAIButton from "@/components/incidentReports/GenerateWithAIButton.jsx";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";


export default function Create() {
	
	const [incidentReportId, setIncidentReportId] = useState(null);
	const [loading, setLoading] = useState(false);
	const valueRef = useRef(null);
	const { shiftId } = useLocalSearchParams();
	
	
	useEffect(() => {
		if(shiftId) initIncident(shiftId);
	}, []);
	
	
	async function initIncident(shiftId) {
		setLoading(true);
		const response = await incidentReportService.init(shiftId);
		setLoading(false);
		setIncidentReportId((response.body.incidentReportId));
	}
	
	
	async function generate() {
		try {
			setLoading(true);
			const response = await incidentReportService.generate(incidentReportId, valueRef.current);
			setLoading(false);
			if(!response.ok) {
				// TODO add error handling for when chatgpt responds in an invalid way
			} else if("followUpQuestions" in response.body) {
				router.push({
					pathname: "/(tabs)/incident-reports/follow-up-questions",
					params: {
						incidentReportId,
						followUpQuestions: JSON.stringify(response.body.followUpQuestions),
					}
				});
			} else {
				router.push({
					pathname: "/(tabs)/incident-reports/see-report",
					params: {
						incidentReportId,
						report: response.body.report,
					}
				});
			}
		} catch(e) {console.log(e)}
		// TODO remove try/catch
	}
	
	
	return (
		<SafeAreaViewWithBackground dismissKeyboardOnPress>
			<TabHeader/>
			<BackButton to="/(tabs)/incident-reports"/>
			<Gap size={20}/>
			
			{!incidentReportId? (<>
				
				<StyledText
					look="22 medium mediumHard"
					hCenter={false}
					style={{ width: "90%", marginHorizontal: "auto", marginBottom: 20 }}
				>
					When did the incident take place?
				</StyledText>
				
				<If condition={loading}>
					<LoadingText/>
				</If>
				
				<If condition={!shiftId}>
					<ShiftList
						dir={-1}
						showPressFeedback
						onPressShift={initIncident}
						mode="plain"
					/>
				</If>
				
			</>) : (
				
				<View style={{ width: "90%", marginHorizontal: "auto" }}>
					<StyledText look="26 medium mediumHard" hCenter={false}>Description</StyledText>
					
					<StyledTextInput
						placeholder="Describe what happened in your own words..."
						valueRef={valueRef}
						bigMode
					/>
					
					<GenerateWithAIButton onPress={generate} disabled={loading}/>
				</View>
				
			)}
		</SafeAreaViewWithBackground>
	);
	
}