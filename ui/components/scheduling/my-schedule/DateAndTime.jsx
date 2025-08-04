import { View } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import { dayOfWeek, shortDate, shortTime } from "@/utils/newDateUtils.js";


export default function DateAndTime({ shiftStart, shiftEnd }) {


	
	return (
		<FlexRowSpaceBetween style={{ alignItems: "flex-end" }}>
			
			<View style={{ marginRight: 10, flexShrink: 1 }}>
				
				<StyledText
					look="48 regular veryHard"
					style={{ marginHorizontal: 0, marginVertical: 0 }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{dayOfWeek(shiftStart, true)}
				</StyledText>
				
				<StyledText
					look="22 light veryHard"
					style={{ marginHorizontal: 0, marginVertical: 0, marginTop: -4 }}
				>
					{shortDate(shiftStart)}
				</StyledText>
				
			</View>
			
			<View style={{ flexShrink: 1 }}>
				
				<StyledText
					look="34 regular veryHard"
					style={{ marginVertical: 0 }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{shortTime(shiftStart)}
				</StyledText>
				
				<StyledText
					look="34 regular veryHard"
					style={{ marginVertical: 0, marginTop: -4 }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{shortTime(shiftEnd)}
				</StyledText>
				
			</View>
			
		</FlexRowSpaceBetween>
	);
	
}