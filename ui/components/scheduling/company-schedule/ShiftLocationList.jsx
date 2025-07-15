import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import ShiftLocation from "@/components/scheduling/company-schedule/ShiftLocation.jsx";
import * as shiftService from "@/services/shiftService.js";
import {groupShiftsByLocation} from "@/utils/groupShifts.js";
import Gap from "@/components/utility-components/Gap.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";


export default function ShiftLocationList({ weekRange }) {
	
	const [shiftLocations, setShiftLocations] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	
	
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			setShiftLocations([]);
			const shifts = (await shiftService.getAll(...weekRange)).body.shifts;
			setShiftLocations(groupShiftsByLocation(shifts));
			setIsLoading(false);
		})();
	}, [weekRange]);
	
	
	return (
		<FlatList
			data={shiftLocations}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item: { locationName, shifts } }) => (
				<ShiftLocation locationName={locationName} shifts={shifts}/>
			)}
			ItemSeparatorComponent={() => <Gap size={16} />}
			ListFooterComponent={(
				<StyledText look="18 semibold hard">
					{isLoading ? "Loading..." : " "}
				</StyledText>
			)}
		/>
	);
	
}