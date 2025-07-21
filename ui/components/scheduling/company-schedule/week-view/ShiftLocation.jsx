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
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import EditButton from "@/components/project-specific-utility-components/EditButton.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import * as shiftService from "@/services/shiftService.js";

export default function ShiftLocation({ locationName: initialLocationName, shifts, weekRange: [startDate, endDate] }) {
	
	const [locationName, setLocationName] = useState(initialLocationName ?? "New location");
	const [shiftDays, setShiftDays] = useState([]);
	const globalState = useGlobalState();
	const [editing, setEditing] = useState(!initialLocationName);
	
	
	useEffect(() => {
		if(initialLocationName) setShiftDays(groupShiftsByDate(shifts));
		else showAllDays();
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
	
	
	function onEdit() {
		setEditing(true);
	}
	
	
	async function submitEdit() {
		setEditing(false);
		if(shifts.length > 0)
			await shiftService.updateShifts(shifts.map(shift => shift.shiftId), { location: locationName });
	}
	
	
	return (
		<View style={{ paddingHorizontal: 15 }}>
			
			<FlexRowSpaceBetween>
				{!editing? (
					<StyledText look="24 regular veryHard" hCenter={false} style={{ marginBottom: 0 }}>
						{locationName}
					</StyledText>
				) : (
					<StyledTextInput
						initialValue={locationName}
						value={locationName}
						onChangeText={setLocationName}
						selectTextOnFocus
						style={{ flex: 0.9, height: 36, fontSize: 24 }}
					/>
				)}
				
				<EditButton
					onEdit={onEdit}
					onDone={submitEdit}
					initiallyEditing={editing}
					style={{ width: undefined, marginHorizontal: undefined, marginVertical: "auto" }}
				/>
			</FlexRowSpaceBetween>
			
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