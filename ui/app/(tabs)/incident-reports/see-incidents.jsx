import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import IncidentList from "@/components/incidentReports/IncidentList.jsx";
import { useIsFocused } from "@react-navigation/native";
import { View } from "react-native";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { router } from "expo-router";


export default function SeeIncidents() {
	
	const isFocused = useIsFocused();
	
	const { isSupervisor } = useGlobalState();
	
	
	function onPressIncident(incidentReportId) {
		router.push({
			pathname: "/(tabs)/incident-reports/see-report",
			params: { incidentReportId }
		});
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<BackButton/>
			
			<View style={{ width: "90%", marginHorizontal: "auto", marginTop: 5 }}>
				<StyledText look="26 medium mediumHard" hCenter={false}>Incident reports</StyledText>
			</View>
			<IncidentList
				isFocused={isFocused}
				showPressFeedback
				onPressIncident={onPressIncident}
				showUsers={isSupervisor}
			/>
		
		</SafeAreaViewWithBackground>
	);
	
}