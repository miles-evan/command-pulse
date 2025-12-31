import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import { useState } from "react";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import ShiftList from "@/components/scheduling/my-schedule/ShiftList.jsx";
import { useIsScreenFocused } from "@/hooks/useIsScreenFocused.js";
import ToggleShiftView from "@/components/scheduling/ToggleShiftView";
import { useGlobalState } from "@/hooks/useGlobalState.js";


export default function MySchedule() {
	
	const [dir, setDir] = useState(1);
	const isFocused = useIsScreenFocused();
	const globalState = useGlobalState();
	
	
	function toggleDir() {
		setDir(prev => -prev);
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			{globalState.isSupervisor && (
				<ToggleShiftView startState={"me"} style={{ textDecorationLine: "underline" }}/>
			)}
			
			<FlexRowSpaceBetween>
				<StyledText look="18 medium medium">
					{dir === 1? "Upcoming shifts:" : "Past shifts:"}
				</StyledText>
				<StyledText look="18 medium accent" onPress={toggleDir}>
					{dir === 1? "See past shifts" : "See upcoming shifts"}
				</StyledText>
			</FlexRowSpaceBetween>
			
			<Gap size={5}/>
			
			<ShiftList dir={dir} isFocused={isFocused} coverRequestable updateNotifications/>
		
		</SafeAreaViewWithBackground>
	);
	
}