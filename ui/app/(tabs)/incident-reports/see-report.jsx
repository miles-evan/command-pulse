import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as incidentReportService from "@/services/incidentReportService.js";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { ScrollView, View } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Questions from "@/components/incidentReports/Questions.jsx";
import GenerateWithAIButton from "@/components/incidentReports/GenerateWithAIButton.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import * as React from "react";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import OrLine from "@/components/general-utility-components/OrLine.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import useKeyboardVisible from "@/hooks/useKeyboardVisible.js";
import If from "@/components/general-utility-components/If.jsx";


export default function SeeReport() {
	
	const { incidentReportId } = useLocalSearchParams();
	const [markdownReport, setMarkdownReport] = useState(null)
	const [loadingReport, setLoadingReport] = useState(false);
	const [loadingGenerate, setLoadingGenerate] = useState(false);
	const keyboardVisible = useKeyboardVisible()
	
	
	useEffect(() => {
		setLoadingReport(true);
		incidentReportService.getReport(incidentReportId)
			.then(response => {
				setLoadingReport(false);
				setMarkdownReport(response.body.report);
			});
	}, []);
	
	
	function revise() {
	
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<BackButton/>
			<Gap size={20}/>
			
			<ScrollView style={{ width: "90%", marginHorizontal: "auto" }}>
				<StyledText look="26 medium veryHard" hCenter={false}>See generated incident report</StyledText>
				<StyledText>{loadingReport? "Loading..." : markdownReport}</StyledText>
				<Button look="blue">Looks good!</Button>
				<OrLine/>
				<StyledText look="20 medium mediumHard" hCenter={false}>Feedback</StyledText>
				<StyledTextInput
					placeholder="What changes should be made..."
					bigMode
					style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
				/>
				<GenerateWithAIButton onPress={revise} disabled={loadingGenerate}/>
				<If condition={keyboardVisible}>
					<Gap size={175}/>
				</If>
			</ScrollView>
		</SafeAreaViewWithBackground>
	);
	
}