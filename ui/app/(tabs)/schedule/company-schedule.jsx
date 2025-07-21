import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import LeftRightSelector from "@/components/project-specific-utility-components/LeftRightSelector.jsx";
import { formatWeekRange, getWeekRange } from "@/utils/dateUtils.js";
import { useMemo, useState } from "react";
import ShiftLocationList from "@/components/scheduling/company-schedule/week-view/ShiftLocationList.jsx";
import { useFocusEffect } from "expo-router";


export default function CompanySchedule() {
	
	const [week, setWeek] = useState(0);
	const weekRange = useMemo(() => getWeekRange(week), [week]);
	const [isFocused, setIsFocused] = useState(false);
	
	
	useFocusEffect(() => {
		setIsFocused(true);
		return () => setIsFocused(false);
	});
	
	
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
			
			<ShiftLocationList weekRange={weekRange} isFocused={isFocused}/>
		
		</SafeAreaViewWithBackground>
	);
	
}