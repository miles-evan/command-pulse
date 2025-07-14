import { View } from "react-native";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { dayOfWeek, shortenTime, shortenDate } from "@/utils/dateUtils.js";
import FlexRowSpaceBetween from "@/components/utility-components/FlexRowSpaceBetween.jsx";


export default function DateAndTime({ date, startTime, endTime }) {


	
	return (
		<FlexRowSpaceBetween style={{ alignItems: "flex-end" }}>
			
			<View style={{ marginRight: 10, flexShrink: 1 }}>
				
				<StyledText
					look="48 regular veryHard"
					style={{ marginHorizontal: 0, marginVertical: 0 }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{dayOfWeek(date)}
				</StyledText>
				
				<StyledText
					look="22 light veryHard"
					style={{ marginHorizontal: 0, marginVertical: 0, marginTop: -4 }}
				>
					{shortenDate(date)}
				</StyledText>
				
			</View>
			
			<View style={{ flexShrink: 1 }}>
				
				<StyledText
					look="34 regular veryHard"
					style={{ marginVertical: 0 }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{shortenTime(startTime)}
				</StyledText>
				
				<StyledText
					look="34 regular veryHard"
					style={{ marginVertical: 0, marginTop: -4 }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{shortenTime(endTime)}
				</StyledText>
				
			</View>
			
		</FlexRowSpaceBetween>
	);
	
}