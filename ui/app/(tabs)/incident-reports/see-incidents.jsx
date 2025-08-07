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
import EditButton from "@/components/project-specific-utility-components/EditButton.jsx";
import { useState } from "react";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";


export default function SeeIncidents() {
	
	const isFocused = useIsFocused();
	const { isSupervisor } = useGlobalState();
	const [editing, setEditing] = useState(false);
	
	
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
			
			<FlexRowSpaceBetween style={{ width: "90%", marginHorizontal: "auto", marginTop: 5 }}>
				<StyledText look="26 medium mediumHard" hCenter={false}>Incident reports</StyledText>
				
				<EditButton
					onEdit={() => setEditing(true)}
					onDone={() => setEditing(false)}
					style={{ width: undefined, marginHorizontal: undefined, marginVertical: "auto" }}
				/>
			</FlexRowSpaceBetween>
			
			<IncidentList
				isFocused={isFocused}
				showPressFeedback
				onPressIncident={onPressIncident}
				showUsers={isSupervisor}
				editing={editing}
			/>
		
		</SafeAreaViewWithBackground>
	);
	
}