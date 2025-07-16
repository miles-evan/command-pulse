import { TextInput } from "react-native";
import { useEffect, useState } from "react";
import { parseTimeRange, superShortenTime } from "@/utils/dateUtils.js";
import { Colors } from "@/constants/Colors.js";


export default function TimeRangeInput({ initialValue, style, ...rest }) {
	
	const [timeRange, setTimeRange] = useState(initialValue ?? "");
	useEffect(parseAndSetTimeRange, []);
	
	
	function parseAndSetTimeRange() {
		setTimeRange(prev => {
			const parsedTimeRange = parseTimeRange(prev);
			if(!parsedTimeRange) return "Invalid";
			return parsedTimeRange.map(time => superShortenTime(time, true)).join("-");
		});
	}
	
	
	function shortenTimeRange() {
		setTimeRange(prev => prev.replace(/pm/g, ""));
	}
	
	
	return (
		<TextInput
			placeholder="H:MM-H:MM"
			placeholderTextColor={Colors.medium}
			value={timeRange}
			selectionColor={Colors.veryHard}
			onChangeText={setTimeRange}
			onEndEditing={parseAndSetTimeRange}
			onFocus={shortenTimeRange}
			style={{
				borderWidth: 1,
				borderColor: Colors.soft,
				borderRadius: 8,
				padding: 8,
				height: 50,
				textAlign: "center",
				...style
			}}
			{...rest}
		/>
	);
	
}
