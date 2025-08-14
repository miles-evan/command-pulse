import ShiftCard from "@/components/scheduling/my-schedule/ShiftCard.jsx";
import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import * as shiftService from "@/services/shiftService.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { computeShiftStage } from "@/components/scheduling/my-schedule/computeShiftStage.js";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import { updateShiftNotifications } from "@/utils/notifications.js";
import { useGlobalState } from "@/hooks/useGlobalState.js";


// retrieves and shows list of shifts
// dir (1 or -1) is direction to look for shifts (forward in time or backward)
export default function ShiftList({
	dir, isFocused=true, showPressFeedback=false, onPressShift=_=>{},
	mode="default", coverRequestable=false, updateNotifications=false
}) {
	
	const [shifts, setShifts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { userId } = useGlobalState();
	
	
	useEffect(() => {
		if(!isFocused) return;
		setShifts([]);
		loadShifts();
	}, [dir, isFocused]);
	
	
	function loadShifts() {
		if(isLoading) return;
		
		// I know this is weird, but its necessary to sync a stale "prev" with fetched data
		setShifts(prev => {
			setIsLoading(true);
			
			(async () => {
				let response = await shiftService.getMy(new Date(), dir, prev.length, 10);
				const { shifts: newShifts } = response.body;
				setShifts([...prev, ...newShifts]);
				
				// notifications
				if(updateNotifications && dir === 1)
					await updateShiftNotifications([...prev, ...newShifts], userId);
				
				// show previous shift if you haven't clocked out yet
				if(dir === 1) {
					response = await shiftService.getMy(new Date(), -1, 0, 1);
					const { shifts: pastShifts } = response.body;
					if(pastShifts.length === 0)
						return setIsLoading(false);
					const pastShift = pastShifts[0];
					if(computeShiftStage(pastShift) === 2 && pastShift.shiftId !== prev[0]?.shiftId)
						setShifts([pastShift, ...prev, ...newShifts]);
				}
				
				setIsLoading(false);
			})();
			
			return prev; // don't update shifts, this was just used to get the most up-to-date value (prev)
		});
	}
	
	
	return (
		<FlatList
			data={shifts}
			keyExtractor={shift => shift.shiftId}
			renderItem={({ item: shift }) => (
				<ShiftCard
					shift={shift}
					showPressFeedback={showPressFeedback}
					onPress={() => onPressShift(shift.shiftId)}
					mode={mode}
					coverRequestable={coverRequestable}
				/>
			)}
			keyboardDismissMode="on-drag"
			onEndReached={() => {
				if(shifts.length > 0) loadShifts();
			}}
			onEndReachedThreshold={0.5}
			ItemSeparatorComponent={() => <Gap size={32} />}
			ListFooterComponent={() => (
				<LoadingText invisible={!isLoading}/>
			)}
		/>
	);
	
}