import Card from "@/components/project-specific-utility-components/Card.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { dayOfWeekShort, superShortenTime } from "@/utils/newDateUtils.js";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import If from "@/components/general-utility-components/If.jsx";
import { Colors } from "@/constants/Colors.js";
import RemoveButton from "@/components/project-specific-utility-components/RemoveButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";


export default function ShiftDayCard({ date, shifts, onPress, editing=false, onDelete=()=>{} }) {
	
	const sortedShifts = useMemo(() => [...shifts].sort((a, b) => a.startTime.localeCompare(b.startTime)), [shifts]);
	
	
	return (
		<View style={styles.cardContainer}>
			<If condition={editing}>
				<Gap size={10}/>
				<RemoveButton onPress={onDelete} style={{ position: "absolute", left: -10, zIndex: 1 }}/>
			</If>
			
			<Pressable onPress={onPress}>
				{({ pressed }) => (
					<Card style={{ ...styles.card, ...(pressed? { borderColor: Colors.medium } : {}) }}>
						
						<StyledText look="26 bold veryHard">
							{dayOfWeekShort(date)}
						</StyledText>
						
						<HorizontalLine color="soft" length="100%" style={styles.divider}/>
						
						{sortedShifts.map(({ firstName, lastName, startTime, endTime }, index) => (
							<View key={index}>
								
								<If condition={index === 5}>
									<StyledText look="18 light veryHard" style={{ marginTop: -10 }}>...</StyledText>
								</If>
								
								<FlexRowSpaceBetween style={styles.shiftContainer}>
									
									<StyledText
										look="18 light veryHard" numberOfLines={1} style={styles.name}>
										{firstName[0] + ". " + lastName}
									</StyledText>
									
									<StyledText look="18 regular veryHard" numberOfLines={1} style={styles.times}>
										{superShortenTime(startTime) + "-" + superShortenTime(endTime)}
									</StyledText>
								
								</FlexRowSpaceBetween>
							
							</View>
						))}
					
					</Card>
				)}
			</Pressable>
		</View>
	);
	
}


// --------------------------------


const styles = {
	cardContainer: {
		marginRight: 15,
	},
	
	card: {
		paddingTop: 2,
		paddingBottom: 9,
		paddingHorizontal: 15,
		justifyContent: "flex-start",
		width: 125,
		height: 175,
		marginVertical: 0,
		overflow: "hidden",
	},
	
	divider: {
		marginTop: 0,
		marginBottom: 3,
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
};