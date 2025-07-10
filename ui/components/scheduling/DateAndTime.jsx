import { View } from "react-native";
import StyledText from "@/components/StyledText";
import { dateOfWeek, formatTime, shortenDate } from "@/utils/dateUtils";


export default function DateAndTime({ date, startTime, endTime }) {


	
	return (
		<View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
			
			<View style={{ marginRight: 10, flexShrink: 1 }}>
				
				<StyledText
					look="48 regular veryHard"
					style={{ marginHorizontal: 0, marginVertical: 0 }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{dateOfWeek(date)}
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
					{formatTime(startTime)}
				</StyledText>
				
				<StyledText
					look="34 regular veryHard"
					style={{ marginVertical: 0, marginTop: -4 }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{formatTime(endTime)}
				</StyledText>
				
			</View>
			
		</View>
	);
	
}