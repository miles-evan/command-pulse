import TabHeader from "@/components/TabHeader";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import { useState } from "react";
import StyledText from "@/components/StyledText";
import FlexRowSpaceBetween from "@/components/FlexRowSpaceBetween";
import Gap from "@/components/Gap";
import ShiftList from "@/components/scheduling/ShiftList";


export default function Schedule() {
	
	const [dir, setDir] = useState(1);
	
	
	function toggleDir() {
		setDir(prev => -prev);
	}
	
	
	return (
		<SafeAreaViewWithBackground>

			<TabHeader />

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