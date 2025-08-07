import { FlatList, Pressable, View } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { useEffect, useMemo, useState } from "react";
import ShiftDayCard from "@/components/scheduling/company-schedule/week-view/ShiftDayCard.jsx";
import { groupShiftsByDate } from "@/utils/groupShifts.js";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { router } from "expo-router";
import AddDayButton from "@/components/scheduling/company-schedule/week-view/AddDayButton.jsx";
import If from "@/components/general-utility-components/If.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import EditButton from "@/components/project-specific-utility-components/EditButton.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import * as shiftService from "@/services/shiftService.js";
import RemoveButton from "@/components/project-specific-utility-components/RemoveButton.jsx";
import FlexRow from "@/components/general-utility-components/FlexRow.jsx";
import { areSameDay } from "@/utils/newDateUtils.js";
import Animated, { LinearTransition } from "react-native-reanimated";


export default function ShiftLocation({
	locationName: initialLocationName, shifts, weekRange: [startDate, endDate], onDelete=()=>{}
}) {
	
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
			if(index < shiftDays.length && areSameDay(shiftDays[index].date, date))
				result.push(shiftDays[index++]);
			else
				result.push({ date, shifts: [] });
			date = new Date(date);
			date.setDate(date.getDate() + 1);
		}
		
		setShiftDays(result);
	}
	
	
	function onEdit() {
		setEditing(true);
	}
	
	
	async function submitEdit() {
		setEditing(false);
		const nonDeletedShifts = shiftDays.flatMap(shiftDay => shiftDay.shifts);
		if(nonDeletedShifts.length > 0)
			await shiftService.updateShifts(nonDeletedShifts.map(shift => shift.shiftId), { location: locationName });
	}
	
	
	function deleteDay(index) {
		if(shiftDays[index].shifts.length > 0)
			shiftService.deleteShifts(shiftDays[index].shifts.map(shift => shift.shiftId));
		setShiftDays(prev => prev.filter((_, i) => i !== index));
	}
	
	
	return (
		<View style={{ paddingHorizontal: 15 }}>
			
			<FlexRowSpaceBetween>
				{!editing? (
					<StyledText look="24 regular veryHard" hCenter={false} style={{ marginBottom: 0 }}>
						{locationName}
					</StyledText>
				) : (
					<FlexRow style={{ flex: 1, alignItems: "center" }}>
						<RemoveButton onPress={onDelete}/>
						<StyledTextInput
							initialValue={locationName}
							value={locationName}
							onChangeText={setLocationName}
							selectTextOnFocus
							style={{ flex: 1, marginHorizontal: 12, height: 36, fontSize: 24 }}
						/>
					</FlexRow>
				)}
				
				<EditButton
					onEdit={onEdit}
					onDone={submitEdit}
					initiallyEditing={editing}
					style={{ width: undefined, marginHorizontal: undefined, marginVertical: "auto" }}
				/>
			</FlexRowSpaceBetween>
			
			<Animated.FlatList
				data={shiftDays}
				keyExtractor={shiftDay => shiftDay.date}
				renderItem={({ item: { date, shifts }, index }) => (
					<ShiftDayCard
						date={date}
						shifts={shifts}
						onPress={() => enlargeShiftDay(index)}
						editing={editing}
						onDelete={() => deleteDay(index)}
					/>
				)}
				ListFooterComponent={(
					<If condition={shiftDays.length < 7}>
						<AddDayButton onPress={showAllDays}/>
					</If>
				)}
				horizontal
				itemLayoutAnimation={LinearTransition}
				style={{ overflow: "visible", marginVertical: 8 }}
			/>
	
		</View>
	);
	
}