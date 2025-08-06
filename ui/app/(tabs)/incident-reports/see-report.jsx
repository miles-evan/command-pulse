import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as incidentReportService from "@/services/incidentReportService.js";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { ScrollView } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Questions from "@/components/incidentReports/Questions.jsx";
import GenerateWithAIButton from "@/components/incidentReports/GenerateWithAIButton.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import * as React from "react";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import OrLine from "@/components/general-utility-components/OrLine.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";


export default function SeeReport() {
	
	const { incidentReportId } = useLocalSearchParams();
	const [markdownReport, setMarkdownReport] = useState(null)
	const [loadingReport, setLoadingReport] = useState(false);
	
	
	useEffect(() => {
		setLoadingReport(true);
		incidentReportService.getReport(incidentReportId)
			.then(response => {
				setLoadingReport(false);
				setMarkdownReport(response.body.report);
			});
	}, []);
	
	
	function revise() {
		// TODO
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<BackButton/>
			<Gap size={20}/>
			
			<StyledText look="26 medium veryHard" hCenter={false}>See generated incident report</StyledText>
			<StyledText>{loadingReport? "Loading..." : markdownReport}</StyledText>
			<Button look="blue">Looks good!</Button>
			<OrLine/>
			<StyledText look="20 medium mediumHard" hCenter={false}>Feedback</StyledText>
			<StyledTextInput bigMode placeholder="What changes should be made..."/>
			<GenerateWithAIButton onPress={revise} disabled={loading}/>
		
		</SafeAreaViewWithBackground>
	);
	
}