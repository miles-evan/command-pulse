import BackButton from "@/components/BackButton.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import ShiftDayCardEnlarged from "@/components/scheduling/company-schedule/ShiftDayCardEnlarged.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { useState } from "react";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground.jsx";
import {ScrollView} from "react-native";


export default function DayShiftViewEnlarged() {
	
	const { params: { shiftDays, index: startIndex, locationName } } = useGlobalState();
	const [index, setIndex] = useState(startIndex);
	
	
	const prevDay = () => setIndex(prev => (shiftDays.length + prev - 1) % shiftDays.length);
	const nextDay = () => setIndex(prev => (prev + 1) % shiftDays.length);
	
	
	return (
		<SafeAreaViewWithBackground>
			<BackButton/>
			<ScrollView>
				<StyledText look="28 semibold veryHard" style={{ marginBottom: -10 }}>{locationName}</StyledText>
				<ShiftDayCardEnlarged
					date={shiftDays[index].date}
					shifts={shiftDays[index].shifts}
					onLeft={prevDay}
					onRight={nextDay}
				/>
			</ScrollView>
		</SafeAreaViewWithBackground>
	);
	
}
