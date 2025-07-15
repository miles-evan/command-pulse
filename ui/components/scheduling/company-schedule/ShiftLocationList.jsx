import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import ShiftLocation from "@/components/scheduling/company-schedule/ShiftLocation.jsx";
import * as shiftService from "@/services/shiftService.js";
import {groupShiftsByLocation} from "@/utils/groupShifts.js";
import Gap from "@/components/utility-components/Gap.jsx";


export default function ShiftLocationList({ weekRange }) {
	
	const [shiftLocations, setShiftLocations] = useState([]);
	
	useEffect(() => {
		(async () => {
			const shifts = (await shiftService.getAll(...weekRange)).body.shifts;
			setShiftLocations(groupShiftsByLocation(shifts));
		})();
	}, [weekRange]);
	
	return (
		<FlatList
			data={shiftLocations}
			renderItem={({ item: { locationName, shifts } }) => (
				<ShiftLocation locationName={locationName} shifts={shifts}/>
			)}
			ItemSeparatorComponent={() => <Gap size={16} />}
		/>
	);
	
}