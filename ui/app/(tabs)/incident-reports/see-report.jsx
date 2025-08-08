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
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons.js";
import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";


export default function SeeReport() {
	
	const params = useLocalSearchParams();
	const [incidentReportId, report] = useMemo(() => [params.incidentReportId, params.report]); // this is so other tabs don't override params
	const [markdownReport, setMarkdownReport] = useState(report ?? null)
	const [loadingReport, setLoadingReport] = useState(false);
	const [loadingGenerate, setLoadingGenerate] = useState(false);
	const keyboardVisible = useKeyboardVisible();
	const scrollViewRef = useRef(null);
	const feedbackRef = useRef(null);
	const [pdfUri, setPdfUri] = useState(null);
	
	
	useEffect(() => {
		if(markdownReport) return; // already sent from previous page
		setLoadingReport(true);
		(async () => {
			try {
				const res = await incidentReportService.getReport(incidentReportId);
				setMarkdownReport(res.body.report);
				setPdfUri(await markdownToPdf(res.body.report));
				
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
	
	
	async function view() {
		await viewPdf(pdfUri);
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
				<If condition={loadingReport}>
					<LoadingText/>
				</If>
				
				<IconAndTextButton
					IconFamily={MaterialCommunityIcons}
					iconName="file-search-outline"
					text="  View incient report"
					size={42}
					fontSize={27}
					onPress={view}
					outerContainerStyle={{ alignItems: undefined }}
					innerContainerStyle={{ flexDirection: "row" }}
					styledTextPropsObj={{ hCenter: false }}
				/>
				
				<Gap size={25}/>
				
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