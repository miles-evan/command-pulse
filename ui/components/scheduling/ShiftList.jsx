import ShiftCard from "@/components/scheduling/ShiftCard";
import {FlatList} from "react-native";
import {useEffect, useState} from "react";
import * as shiftService from "@/services/shiftService";
import {getCurrentTimeString, getTodayString} from "@/utils/dateUtils";
import StyledText from "@/components/StyledText";
import Gap from "@/components/Gap";
import {computeShiftStage} from "@/components/scheduling/computeShiftStage";


export default function ShiftList({ dir }) {
	
	const [shifts, setShifts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	
	useEffect(() => {
		setShifts([]);
		loadShifts();
	}, [dir]);
	
	
	function loadShifts() {
		if(isLoading) return;
		
		// I know this is weird, but its necessary to sync a stale "prev" with fetched data
		setShifts(prev => {
			setIsLoading(true);
			
			(async () => {
				let response = await shiftService.getMy(getTodayString(), getCurrentTimeString(), dir, prev.length, 10);
				const { shifts: newShifts } = response.body;
				setShifts([...prev, ...newShifts]);
				
				// show previous shift if you haven't clocked out yet
				if(dir === 1) {
					response = await shiftService.getMy(getTodayString(), getCurrentTimeString(), -1, 0, 1);
					const { shifts: pastShifts } = response.body;
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
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item: shift }) => <ShiftCard shift={shift} />}
			keyboardDismissMode="on-drag"
			onEndReached={loadShifts}
			onEndReachedThreshold={0.5}
			ItemSeparatorComponent={() => <Gap size={32} />}
			ListFooterComponent={() => (
				<StyledText look="18 semibold hard">
					{isLoading ? "Loading..." : " "}
				</StyledText>
			)}
		/>
	);
	
}