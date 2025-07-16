import { FlatList, Pressable, View } from "react-native";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { useMemo } from "react";
import ShiftDayCard from "@/components/scheduling/company-schedule/ShiftDayCard.jsx";
import { groupShiftsByDate } from "@/utils/groupShifts.js";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import {router} from "expo-router";

export default function ShiftLocation({ locationName, shifts }) {
	
	const shiftDays = useMemo(() => groupShiftsByDate(shifts), [shifts]);
	const globalState = useGlobalState();
	
	
	function enlargeShiftDay(index) {
		globalState.params = { shiftDays, index, locationName };
		router.push("/(tabs)/schedule/day-shift-view-enlarged");
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
				horizontal
				style={{ overflow: "visible" }}
			/>
			
		</View>
	);
	
}