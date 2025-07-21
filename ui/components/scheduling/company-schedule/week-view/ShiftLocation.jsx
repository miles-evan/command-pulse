import { FlatList, Pressable, View } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { useEffect, useMemo, useState } from "react";
import ShiftDayCard from "@/components/scheduling/company-schedule/week-view/ShiftDayCard.jsx";
import { groupShiftsByDate } from "@/utils/groupShifts.js";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { router } from "expo-router";
import AddDayButton from "@/components/scheduling/company-schedule/week-view/AddDayButton.jsx";
import { getRelativeDate } from "@/utils/dateUtils.js";
import If from "@/components/general-utility-components/If.jsx";

export default function ShiftLocation({ locationName, shifts, weekRange: [startDate, endDate] }) {
	
	const [shiftDays, setShiftDays] = useState([]);
	const globalState = useGlobalState();
	
	
	useEffect(() => {
		setShiftDays(groupShiftsByDate(shifts));
	}, [shifts]);
	
	
	function enlargeShiftDay(index) {
		globalState.params = { shiftDays, index, locationName };
		router.push("/(tabs)/schedule/day-shift-view-enlarged");
	}
	
	
	function showAllDays() {
		let date = startDate;
		let index = 0;
		const result = [];
		
		while(date <= endDate) {
			if(index < shiftDays.length && shiftDays[index].date === date)
				result.push(shiftDays[index++]);
			else
				result.push({ date, shifts: [] });
			
			date = getRelativeDate(date, 1);
		}
		
		setShiftDays(result);
	}
	
	
	return (
		<View style={{ marginLeft: 15 }}>
			
			<StyledText look="24 regular veryHard" hCenter={false} style={{ marginBottom: 0 }}>
				{locationName}
			</StyledText>
			
			<FlatList
				data={shiftDays}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item: { date, shifts }, index }) => (
					<Pressable onPress={() => enlargeShiftDay(index)}>
						{({ pressed }) => (
							<ShiftDayCard date={date} shifts={shifts} showFeedback={pressed}/>
						)}
					</Pressable>
				)}
				ListFooterComponent={(
					<If condition={shiftDays.length < 7}>
						<AddDayButton onPress={showAllDays}/>
					</If>
				)}
				horizontal
				style={{ overflow: "visible" }}
			/>
			
		</View>
	);
	
}