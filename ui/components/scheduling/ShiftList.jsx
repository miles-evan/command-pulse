import ShiftCard from "@/components/scheduling/ShiftCard";
import {FlatList} from "react-native";
import {useEffect, useState} from "react";
import * as shiftService from "@/services/shiftService";
import {getCurrentTimeString, getTodayString} from "@/utils/dateUtils";
import ShowIf from "@/components/ShowIf";
import StyledText from "@/components/StyledText";
import Gap from "@/components/Gap";


export default function ShiftList({ dir }) {
	
	const [shifts, setShifts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	
	useEffect(() => {
		setShifts([]);
		loadShifts();
	}, [dir]);
	
	
	function loadShifts() {
		if(isLoading) return;
		
		// I know this is weird, but its necessary to sync the old shifts with new shifts when adding new ones
		setShifts(prev => {
			setIsLoading(true);
			
			(async () => {
				const response = await shiftService.getMy(getTodayString(), getCurrentTimeString(), dir, prev.length, 10);
				const { shifts: newShifts } = response.body;
				setShifts([...prev, ...newShifts]);
				setIsLoading(false);
			})();
			
			return prev; // don't change, this was just used to get the most up-to-date value (prev)
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