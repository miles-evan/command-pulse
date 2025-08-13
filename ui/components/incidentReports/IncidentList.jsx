import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import * as incidentReportService from "@/services/incidentReportService.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import IncidentCard from "@/components/incidentReports/IncidentCard.jsx";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useGlobalState } from "@/hooks/useGlobalState.js";


// retrieves and shows list of incidents
// dir (1 or -1) is direction to look for incidents (forward in time or backward)
export default function IncidentList({
	isFocused=true, showPressFeedback=false, onPressIncident=_=>{}, showUsers=false, editing
}) {
	
	const [incidents, setIncidents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { isSupervisor } = useGlobalState();
	
	
	useEffect(() => {
		if(!isFocused) return;
		setIncidents([]);
		loadIncidents();
	}, [isFocused]);
	
	
	function loadIncidents() {
		if(isLoading) return;
		
		// I know this is weird, but its necessary to sync a stale "prev" with fetched data
		setIncidents(prev => {
			setIsLoading(true);
			
			(async () => {
				let response = await incidentReportService[isSupervisor? "getAll" : "getMy"](prev.length, 10);
				const { incidents: newIncidents } = response.body;
				setIncidents([...prev, ...newIncidents]);
				setIsLoading(false);
			})();
			
			return prev; // don't update incidents, this was just used to get the most up-to-date value (prev)
		});
	}
	
	
	async function deleteIncident(incidentReportId) {
		setIncidents(prev => prev.filter(incident => incident.incidentReportId !== incidentReportId));
		await incidentReportService.deleteIncident(incidentReportId)
	}
	
	
	return (
		<Animated.FlatList
			data={incidents}
			keyExtractor={incident => incident.incidentReportId}
			renderItem={({ item: incident }) => (
				<IncidentCard
					incident={incident}
					showPressFeedback={showPressFeedback}
					onPress={() => onPressIncident(incident.incidentReportId)}
					showUser={showUsers}
					editing={editing}
					onDelete={deleteIncident}
				/>
			)}
			keyboardDismissMode="on-drag"
			onEndReached={() => {
				if(incidents.length > 0) loadIncidents();
			}}
			onEndReachedThreshold={0.5}
			ListFooterComponent={() => (
				<LoadingText invisible={!isLoading}/>
			)}
			itemLayoutAnimation={LinearTransition}
		/>
	);
	
}