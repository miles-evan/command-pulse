import FlexRowSpaceBetween from "@/components/utility-components/FlexRowSpaceBetween.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { superShortenTime } from "@/utils/dateUtils.js";
import If from "@/components/utility-components/If.jsx";
import PersonDropDown from "@/components/PersonDropDown.jsx";
import { StyleSheet } from "react-native";
import TimeRangeInput from "@/components/scheduling/company-schedule/TimeRangeInput.jsx";
import Gap from "@/components/utility-components/Gap.jsx";
import StyledTextInput from "@/components/StyledTextInput.jsx";

export default function ShiftEntryEnlarged({ shift, editing=false }) {
	
	const { userId, firstName, lastName, startTime, endTime, payRate } = shift;
	
	
	return (
		<>
			<If condition={!editing}>
				<FlexRowSpaceBetween style={{ alignItems: "center", marginVertical: 1.5 }}>
					
					<StyledText look="26 light veryHard" numberOfLines={1} ellipsizeMode="clip" style={styles.name}>
						{firstName + " " + lastName}
					</StyledText>
					
					<StyledText look="26 light veryHard" numberOfLines={1} style={styles.times}>
						{superShortenTime(startTime) + "-" + superShortenTime(endTime)}
					</StyledText>
				
				</FlexRowSpaceBetween>
			</If>
			
			
			<If condition={editing}>
				<FlexRowSpaceBetween style={{ alignItems: "center" }}>
					<PersonDropDown initialSelectionUserId={userId} placeholder={firstName + " " + lastName} style={{ flex: 2 }}/>
					<StyledTextInput keyboardType="numeric" initialValue={String(payRate)}/>
					<TimeRangeInput initialValue={startTime + "-" + endTime}/>
				</FlexRowSpaceBetween>
				<Gap size={8}/>
			</If>
		</>
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