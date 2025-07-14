import TabHeader from "@/components/TabHeader";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import { useState } from "react";
import StyledText from "@/components/utility-components/StyledText.jsx";
import FlexRowSpaceBetween from "@/components/utility-components/FlexRowSpaceBetween.jsx";
import Gap from "@/components/utility-components/Gap.jsx";
import ShiftList from "@/components/scheduling/my-schedule/ShiftList.jsx";
import BackButton from "@/components/BackButton.jsx";


export default function MySchedule() {
	
	const [dir, setDir] = useState(1);
	
	
	function toggleDir() {
		setDir(prev => -prev);
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader />
			
			<BackButton/>
			
			<FlexRowSpaceBetween>
				<StyledText look="18 medium medium">
					{dir === 1? "Upcoming shifts:" : "Past shifts:"}
				</StyledText>
				<StyledText look="18 medium accent" onPress={toggleDir}>
					{dir === 1? "See past shifts" : "See upcoming shifts"}
				</StyledText>
			</FlexRowSpaceBetween>
			
			<Gap size={5}/>
			
			<ShiftList dir={dir}/>
		
		</SafeAreaViewWithBackground>
	
	);
}