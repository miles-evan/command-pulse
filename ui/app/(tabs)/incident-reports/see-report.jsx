import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import * as incidentReportService from "@/services/incidentReportService.js";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { ScrollView, View } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import GenerateWithAIButton from "@/components/incidentReports/GenerateWithAIButton.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import * as React from "react";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import OrLine from "@/components/general-utility-components/OrLine.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import useKeyboardVisible from "@/hooks/useKeyboardVisible.js";
import If from "@/components/general-utility-components/If.jsx";
import { markdownToPdf, sharePdf, viewPdf } from "@/utils/mardownToPDF.js";


export default function SeeReport() {
	
	const params = useLocalSearchParams();
	const [incidentReportId, report] = useMemo(() => [params.incidentReportId, params.report]); // this is so other tabs don't override params
	const [markdownReport, setMarkdownReport] = useState(report ?? null)
	const [loadingReport, setLoadingReport] = useState(false);
	const [loadingGenerate, setLoadingGenerate] = useState(false);
	const keyboardVisible = useKeyboardVisible();
	const scrollViewRef = useRef(null);
	const feedbackRef = useRef(null);
	
	
	useEffect(() => {
		if(markdownReport) return; // already sent from previous page
		setLoadingReport(true);
		(async () => {
			try {
				const res = await incidentReportService.getReport(incidentReportId);
				setMarkdownReport(res.body.report);
				const uri = await markdownToPdf(res.body.report);
				await viewPdf(uri);
			} finally {
				setLoadingReport(false);
			}
		})();
	}, []);
	
	
	useEffect(() => {
		if(keyboardVisible) scrollViewRef.current?.scrollToEnd({ animated: true });
	}, [keyboardVisible]);
	
	
	async function revise() {
		setLoadingGenerate(true);
		setLoadingReport(true);
		
		const response = await incidentReportService.generate(incidentReportId, feedbackRef.current);
		
		setLoadingGenerate(false);
		setLoadingReport(false);
		
		setMarkdownReport(response.body.report);
	}
	
	
	function share() {
		// sharePdf(uri)
		router.replace("/(tabs)/incident-reports");
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<BackButton/>
			<Gap size={20}/>
			
			<ScrollView
				ref={scrollViewRef}
				keyboardDismissMode="on-drag"
				keyboardShouldPersistTaps="handled"
				style={{ width: "90%", marginHorizontal: "auto" }}
			>
				<StyledText look="26 medium veryHard" hCenter={false}>See generated incident report</StyledText>
				<StyledText>{loadingReport? "Loading..." : markdownReport}</StyledText>
				<Button look="blue" onPress={share}>Looks good!</Button>
				<OrLine style={{ marginVertical: 10 }}/>
				<StyledText look="20 medium mediumHard" hCenter={false}>Feedback</StyledText>
				<StyledTextInput
					placeholder="What changes should be made..."
					valueRef={feedbackRef}
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