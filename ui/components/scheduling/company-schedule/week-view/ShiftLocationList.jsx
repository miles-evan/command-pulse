import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import ShiftLocation from "@/components/scheduling/company-schedule/week-view/ShiftLocation.jsx";
import * as shiftService from "@/services/shiftService.js";
import { groupShiftsByLocation } from "@/utils/groupShifts.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import AddLocationButton from "@/components/scheduling/company-schedule/week-view/AddLocationButton.jsx";
import { useIsScreenFocused } from "@/hooks/useIsScreenFocused.js";
import If from "@/components/general-utility-components/If.jsx";


export default function ShiftLocationList({ weekRange }) {
	
	const [shiftLocations, setShiftLocations] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	const [newLocationsNextKey, setNewLocationsNextKey] = useState(0);
	const isFocused = useIsScreenFocused();
	
	
	useEffect(() => {
		if(!isFocused) return;
		(async () => {
			setIsLoading(true);
			const shifts = (await shiftService.getAll(...weekRange)).body.shifts;
			setShiftLocations(groupShiftsByLocation(shifts));
			setIsLoading(false);
		})();
	}, [weekRange, isFocused]);
	
	
	function addLocation() {
		setShiftLocations(prev => [...prev, { shifts: [], key: newLocationsNextKey }]);
		setNewLocationsNextKey(prev => prev + 1);
	}
	
	
	function deleteLocation(index) {
		if(shiftLocations[index].shifts.length > 0)
			shiftService.deleteShifts(shiftLocations[index].shifts.map(shift => shift.shiftId));
		setShiftLocations(prev => prev.filter((_, i) => i !== index));
	}
	
	
	return (
		<FlatList
			data={shiftLocations}
			keyExtractor={shiftLocation => "key" in shiftLocation? shiftLocation.key : shiftLocation.locationName}
			renderItem={({ item: { locationName, shifts }, index }) => (
				<ShiftLocation
					locationName={locationName}
					shifts={shifts}
					weekRange={weekRange}
					onDelete={() => deleteLocation(index)}
				/>
			)}
			ItemSeparatorComponent={() => <Gap size={16} />}
			ListHeaderComponent={(
				<StyledText look="18 semibold hard" style={{ marginVertical: 0 }}>{isLoading? "Loading..." : " "}</StyledText>
			)}
			ListFooterComponent={(
				<AddLocationButton onPress={addLocation} style={{ marginBottom: 16 }}/>
			)}
		/>
	);
	
}