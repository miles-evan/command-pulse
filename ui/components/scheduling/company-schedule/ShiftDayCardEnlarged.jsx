import { useMemo } from "react";
import Card from "@/components/Card.jsx";
import LeftRightSelector from "@/components/LeftRightSelector.jsx";
import {dayOfWeek, superShortenTime} from "@/utils/dateUtils.js";
import HorizontalLine from "@/components/utility-components/HorizontalLine.jsx";
import FlexRowSpaceBetween from "@/components/utility-components/FlexRowSpaceBetween.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { StyleSheet, View } from "react-native";
import If from "@/components/utility-components/If.jsx";
import AddShiftButton from "@/components/scheduling/company-schedule/AddShiftButton.jsx";
import Gap from "@/components/utility-components/Gap.jsx";


export default function ShiftDayCardEnlarged({ date, shifts, onLeft, onRight }) {
	
	const sortedShifts = useMemo(() => [...shifts].sort((a, b) => a.startTime.localeCompare(b.startTime)), [shifts]);
	
	
	return (
		<Card>
			
			<LeftRightSelector onLeft={onLeft} onRight={onRight}>{dayOfWeek(date)}</LeftRightSelector>
			
			<HorizontalLine color="soft" length={"100%"}/>
			
			{sortedShifts.map(({ firstName, lastName, startTime, endTime }, index) => (
				<View key={index}>
					<FlexRowSpaceBetween style={styles.shiftContainer}>
						
						<StyledText
							look="26 light veryHard" numberOfLines={1} ellipsizeMode="clip" style={styles.name}>
							{firstName + " " + lastName}
						</StyledText>
						
						<StyledText look="26 light veryHard" numberOfLines={1} style={styles.times}>
							{superShortenTime(startTime) + "-" + superShortenTime(endTime)}
						</StyledText>
					
					</FlexRowSpaceBetween>
					
					<If condition={index < sortedShifts.length - 1}>
						<HorizontalLine color="softer"/>
					</If>
				</View>
			))}
			
			<Gap size={15}/>
			<AddShiftButton/>
			
		</Card>
	);
	
}


// --------------------------------


const styles = StyleSheet.create({
	card: {
		justifyContent: "flex-start",
		width: "90%",
		minHeight: "75%",
	},
	
	shiftContainer: {
		marginVertical: 1.5,
	},
	
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