import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import ShiftDayCardEnlarged from "@/components/scheduling/company-schedule/day-view/ShiftDayCardEnlarged.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { useMemo, useState } from "react";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import PersonDropDown from "@/components/project-specific-utility-components/PersonDropDown.jsx";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";


export default function DayShiftViewEnlarged() {
	
	const params = useMemo(() => useGlobalState().params, []); // prevents other tabs from overwriting params
	const { shiftDays, index: startIndex, locationName } = params;
	const [index, setIndex] = useState(startIndex);
	
	
	const prevDay = () => setIndex(prev => prev - 1);
	const nextDay = () => setIndex(prev => prev + 1);
	
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<BackButton/>
			<Gap size={10}/>
			<KeyboardAvoidingView behavior="padding">
				<ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
					<StyledText look="28 semibold veryHard" style={{ marginBottom: -10 }}>{locationName}</StyledText>
					<ShiftDayCardEnlarged
						date={shiftDays[index].date}
						locationName={locationName}
						shifts={shiftDays[index].shifts}
						onLeft={prevDay}
						onRight={nextDay}
						leftDisabled={index === 0}
						rightDisabled={index === shiftDays.length - 1}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaViewWithBackground>
	);
	
}
