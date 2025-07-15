import Card from "@/components/Card.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";
import {dayOfWeekShort, superShortenTime} from "@/utils/dateUtils.js";
import FlexRowSpaceBetween from "@/components/utility-components/FlexRowSpaceBetween.jsx";
import HorizontalLine from "@/components/utility-components/HorizontalLine.jsx";


export default function ShiftDayCard({ date, shifts }) {

	return (
		<Card style={{ paddingTop: 2, paddingHorizontal: 15, justifyContent: "flex-start", width: 125, height: 175, marginRight: 15 }}>
		
			<StyledText look="26 bold veryHard">
				{dayOfWeekShort(date)}
			</StyledText>
			
			<HorizontalLine color="soft" length="100%" style={{ marginVertical: 0 }}/>
			
			{shifts.map(({ firstName, startTime, endTime }, index) => (
				<FlexRowSpaceBetween key={index}>
					
					<StyledText look="18 light veryHard" numberOfLines={1} style={{ flexShrink: 1, flex: 1, marginRight: 5 }}>
						{firstName}
					</StyledText>
					
					<StyledText look="18 light veryHard" numberOfLines={1} style={{ flexShrink: 1 }}>
						{superShortenTime(startTime) + "-" + superShortenTime(endTime)}
					</StyledText>
					
				</FlexRowSpaceBetween>
			))}
			
		</Card>
	);
	
}