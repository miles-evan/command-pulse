import {FlatList, View} from "react-native";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { useEffect, useState } from "react";
import ShiftDayCard from "@/components/scheduling/company-schedule/ShiftDayCard.jsx";
import { groupShiftsByDate } from "@/utils/groupShifts.js";
import Gap from "@/components/utility-components/Gap.jsx";

export default function ShiftLocation({ locationName, shifts }) {
	
	const [shiftDays, setShiftDays] = useState([]);
	
	
	useEffect(() => {
		setShiftDays(groupShiftsByDate(shifts))
	}, [shifts]);
	
	
	return (
		<View style={{ marginLeft: 15 }}>
			
			<StyledText look="24 regular veryHard" hCenter={false} style={{ marginBottom: 0 }}>
				{locationName}
			</StyledText>
			
			<FlatList
				data={shiftDays}
				renderItem={({ item: { date, shifts } }) => <ShiftDayCard date={date} shifts={shifts}/>}
				horizontal
			/>
			
		</View>
	);
	
}