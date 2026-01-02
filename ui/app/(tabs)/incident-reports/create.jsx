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
import { ScrollView, View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import GenerateWithAIButton from "@/components/incidentReports/GenerateWithAIButton.jsx";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import SpringyAnimatedView from "@/components/general-utility-components/SpringyAnimatedView.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import useKeyboardVisible from "@/hooks/useKeyboardVisible.js";
import LinearAnimatedView from "@/components/general-utility-components/LinearAnimatedView.jsx";


export default function Create() {
	
	const [incidentReportId, setIncidentReportId] = useState(null);
	const [loading, setLoading] = useState(false);
	const valueRef = useRef(null);
	const { shiftId } = useLocalSearchParams();
	const keyboardVisible = useKeyboardVisible();
	
	
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
		} catch(e) {console.log("generating failed:", e)}
		// TODO remove try/catch
	}
	
	
	return (
		<SafeAreaViewWithBackground dismissKeyboardOnPress>
			<TabHeader/>
			<BackButton to="/(tabs)/incident-reports"/>
			<Gap size={20}/>
			
			{!incidentReportId? (
				
				<SpringyAnimatedView style={{ flex: 1 }}>
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
							sortBy="shiftStart"
						/>
					</If>
				</SpringyAnimatedView>
				
			) : (
				
				<SpringyAnimatedView style={{ width: "90%", marginHorizontal: "auto" }}>
					<StyledText look="26 medium mediumHard" hCenter={false}>Description</StyledText>
					
					<If condition={!keyboardVisible}>
						<StyledText look="18 mediumSoft mediumHard" hCenter={false}>
							Type your response below, or use the microphone on your keyboard:
						</StyledText>
						<HorizontalLine length="100%" style={{ marginTop: "15", marginBottom: "25" }}/>
					</If>
					
					<SpringyAnimatedView damping={30} stiffness={100}>
						<StyledTextInput
							placeholder={"Describe what happened in your own words..."}
							valueRef={valueRef}
							bigMode
							whiteTintedBackground
						/>
						
						<GenerateWithAIButton onPress={generate} disabled={loading}/>
					</SpringyAnimatedView>
				</SpringyAnimatedView>
				
			)}
		</SafeAreaViewWithBackground>
	);
	
}