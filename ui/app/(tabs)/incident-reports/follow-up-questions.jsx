import { useLocalSearchParams } from "expo-router";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import * as React from "react";
import { useMemo, useRef, useState } from "react";
import * as incidentReportService from "@/services/incidentReportService.js";
import Questions from "@/components/incidentReports/Questions.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import GenerateWithAIButton from "@/components/incidentReports/GenerateWithAIButton.jsx";
import { ScrollView, View } from "react-native";


export default function FollowUpQuestions() {
	
	const answerRefsRef = useRef({});
	const params = useLocalSearchParams();
	const [incidentReportId, followUpQuestions] = useMemo(
		() => [params.incidentReportId, JSON.parse(params.followUpQuestions)]
	, []);
	const [loading, setLoading] = useState(false);
	
	
	async function revise() {
		setLoading(true);
		const response = await incidentReportService.generate(incidentReportId, JSON.stringify(answerRefsRef.current))
		setLoading(false);
		// TODO
	}
	
	
	return (
		<SafeAreaViewWithBackground dismissKeyboardOnPress>
			<TabHeader/>
			<BackButton/>
			<Gap size={20}/>
			
			<ScrollView style={{ width: "90%", marginHorizontal: "auto" }}>
				<StyledText look="24 medium veryHard" hCenter={false}>Follow up questions from AI</StyledText>
				<Gap size={20}/>
				<Questions questions={followUpQuestions} answerRefsRef={answerRefsRef}/>
				<GenerateWithAIButton onPress={revise} disabled={loading}/>
			</ScrollView>
			
		</SafeAreaViewWithBackground>
	);

}