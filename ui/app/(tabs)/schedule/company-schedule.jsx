import TabHeader from "@/components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground.jsx";
import LeftRightSelector from "@/components/LeftRightSelector.jsx";
import { formatWeekRange, getWeekRange } from "@/utils/dateUtils.js";
import { useState } from "react";
import ShiftLocationList from "@/components/scheduling/company-schedule/ShiftLocationList.jsx";


export default function CompanySchedule() {
	
	const [week, setWeek] = useState(0);
	const weekRange = getWeekRange(week);
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			<LeftRightSelector
				onLeft={() => setWeek(prev => prev - 1)}
				onRight={() => setWeek(prev => prev + 1)}
				containerStyle={{ width: "75%" }}
			>
				{formatWeekRange(weekRange)}
			</LeftRightSelector>
			
			<ShiftLocationList weekRange={weekRange}/>
		
		</SafeAreaViewWithBackground>
	);
	
}