import { View } from "react-native";
import StyledText from "@/components/StyledText";


export default function DateAndTime({ date, startTime, endTime }) {
	
	const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
	
	const d = new Date(date);
	const shortenedDate = `${d.getMonth() + 1}/${d.getDate()}`
	
	function formatTime(time) {
		const parts = time.split(" ");
		return parts[0] + parts[1].toLowerCase();
	}
	
	return (
		<View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
			
			<View style={{ marginRight: 10 }}>
				
				<StyledText look="48 regular veryHard" style={{ marginHorizontal: 0, marginVertical: 0 }}>
					{dayOfWeek}
				</StyledText>
				
				<StyledText look="22 light veryHard" style={{ marginHorizontal: 0, marginVertical: 0, marginTop: -4 }}>
					{shortenedDate}
				</StyledText>
				
			</View>
			
			<View>
				
				<StyledText look="34 regular veryHard" style={{ marginVertical: 0 }}>
					{formatTime(startTime)}
				</StyledText>
				
				<StyledText look="34 regular veryHard" style={{ marginVertical: 0, marginTop: -4 }}>
					{formatTime(endTime)}
				</StyledText>
				
			</View>
			
		</View>
	)
	
}