import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import * as incidentReportService from "@/services/incidentReportService.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import IncidentCard from "@/components/incidentReports/IncidentCard.jsx";


// retrieves and shows list of incidents
// dir (1 or -1) is direction to look for incidents (forward in time or backward)
export default function IncidentList({ isFocused=true, showPressFeedback=false, onPressIncident=_=>{}, showUsers=false }) {
	
	const [incidents, setIncidents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	
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
				let response = await incidentReportService.getMy(prev.length, 10);
				const { incidents: newIncidents } = response.body;
				setIncidents([...prev, ...newIncidents]);
				setIsLoading(false);
			})();
			
			return prev; // don't update incidents, this was just used to get the most up-to-date value (prev)
		});
	}
	
	
	return (
		<FlatList
			data={incidents}
			keyExtractor={incident => incident.incidentReportId}
			renderItem={({ item: incident }) => (
				<IncidentCard
					incident={incident}
					showPressFeedback={showPressFeedback}
					onPress={() => onPressIncident(incident.incidentReportId)}
					showUser={showUsers}
				/>
			)}
			keyboardDismissMode="on-drag"
			onEndReached={() => {
				if(incidents.length > 0) loadIncidents();
			}}
			onEndReachedThreshold={0.5}
			ItemSeparatorComponent={() => <Gap size={32} />}
			ListFooterComponent={() => (
				<LoadingText invisible={!isLoading}/>
			)}
		/>
	);
	
}