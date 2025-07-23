import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import LeftRightSelector from "@/components/project-specific-utility-components/LeftRightSelector.jsx";
import { formatWeekRange, getWeekRange } from "@/utils/dateUtils.js";
import { useMemo, useState } from "react";
import ShiftLocationList from "@/components/scheduling/company-schedule/week-view/ShiftLocationList.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { useIsScreenFocused } from "@/hooks/useIsScreenFocused.js";


export default function CompanySchedule() {
	
	const [week, setWeek] = useState(0);
	const weekRange = useMemo(() => getWeekRange(week), [week]);
	const isFocused = useIsScreenFocused();
	
	
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
			
			<Gap size={15}/>
			
			<ShiftLocationList weekRange={weekRange} isFocused={isFocused}/>
		
		</SafeAreaViewWithBackground>
	);
	
}