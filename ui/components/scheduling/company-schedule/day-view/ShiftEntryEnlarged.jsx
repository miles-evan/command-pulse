import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { superShortenTime } from "@/utils/dateUtils.js";
import PersonDropDown from "@/components/scheduling/company-schedule/day-view/PersonDropDown.jsx";
import { StyleSheet } from "react-native";
import TimeRangeInput from "@/components/scheduling/company-schedule/day-view/TimeRangeInput.jsx";
import PayRateInput from "@/components/scheduling/company-schedule/day-view/PayRateInput.jsx";
import { useEffect, useRef } from "react";
import RemoveButton from "@/components/project-specific-utility-components/RemoveButton.jsx";

export default function ShiftEntryEnlarged({ shift, editing=false, onChangeEdits=_=>{}, onDelete=()=>{} }) {
	
	const { userId, firstName, lastName, startTime, endTime, payRate } = shift;
	const edits = useRef({}); // useRef so that it doesn't rerender
	
	
	function addEdit(attr, value) {
		if(attr === "timeRange") {
			if(value === null) value = [null, null];
			addEdit("startTime", value[0]);
			addEdit("endTime", value[1]);
			return;
		}
		
		if(shift[attr] === value) {
			delete edits.current[attr];
		} else {
			edits.current[attr] = value;
		}
		
		onChangeEdits({ ...edits.current });
	}
	
	
	useEffect(() => {
		edits.current = {}; // this is a redundant protective measure
	}, [editing]);
	
	
	return (
		!editing? (
			<FlexRowSpaceBetween style={{ alignItems: "center", marginVertical: 1.5 }}>
				
				<StyledText look="26 light veryHard" numberOfLines={1} ellipsizeMode="clip" style={styles.name}>
					{firstName + " " + lastName}
				</StyledText>
				
				<StyledText look="26 light veryHard" numberOfLines={1} style={styles.times}>
					{superShortenTime(startTime) + "-" + superShortenTime(endTime)}
				</StyledText>
			
			</FlexRowSpaceBetween>
		) : (
			<FlexRowSpaceBetween style={{ alignItems: "center", marginBottom: 8 }}>
				
				<RemoveButton onPress={onDelete} style={{ marginRight: 5 }}/>
				
				<PersonDropDown
					initialSelectionUserId={userId}
					onNewValue={newUserId => addEdit("userId", newUserId)}
					style={{ flex: 2 }}
				/>
				
				<PayRateInput
					initialValue={payRate}
					onNewValue={newPayRate => addEdit("payRate", newPayRate)}
				/>
				
				<TimeRangeInput
					initialValue={startTime? startTime + "-" + endTime : undefined}
					onNewValue={newTimeRange => addEdit("timeRange", newTimeRange)}
				/>
			
			</FlexRowSpaceBetween>
		)
	);
	
}


// --------------------------------


const styles = StyleSheet.create({
	name: {
		flexShrink: 1,
		flex: 1,
		marginRight: 5,
		marginVertical: 0,
	},
	
	times: {
		flexShrink: 1,
		marginVertical: 0,
	},
})