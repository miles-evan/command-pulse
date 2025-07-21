import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import ShiftLocation from "@/components/scheduling/company-schedule/week-view/ShiftLocation.jsx";
import * as shiftService from "@/services/shiftService.js";
import { groupShiftsByLocation } from "@/utils/groupShifts.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";


export default function ShiftLocationList({ weekRange, isFocused }) {
	
	const [shiftLocations, setShiftLocations] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	
	
	useEffect(() => {
		if(!isFocused) return;
		(async () => {
			setIsLoading(true);
			setShiftLocations([]);
			const shifts = (await shiftService.getAll(...weekRange)).body.shifts;
			setShiftLocations(groupShiftsByLocation(shifts));
			setIsLoading(false);
		})();
	}, [weekRange, isFocused]);
	
	
	return (
		<FlatList
			data={shiftLocations}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item: { locationName, shifts } }) => (
				<ShiftLocation locationName={locationName} shifts={shifts} weekRange={weekRange}/>
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