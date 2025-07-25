import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import ShiftCard from "@/components/scheduling/my-schedule/ShiftCard.jsx";
import { ScrollView } from "react-native";


export default function Shifts() {
	
	const { user, shifts } = useGlobalState().params;
	
	
	function formatShifts(shifts) {
		return shifts.map(shift => (
			<ShiftCard key={shift.shiftId} shift={shift} mode="pay cycle"/>
		));
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			<BackButton style={{ marginVertical: 5 }}/>
			
			<StyledText look="22 medium veryHard" hCenter={false} style={{ width: "90%", marginHorizontal: "auto" }}>
				Shifts
			</StyledText>
			
			<ScrollView>
				{formatShifts(shifts)}
			</ScrollView>
		
		</SafeAreaViewWithBackground>
	);
	
}