import { useEffect, useMemo, useState } from "react";
import { parseTimeRange, superShortenTime } from "@/utils/dateUtils.js";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import { Colors } from "@/constants/Colors.js";


export default function TimeRangeInput({ initialValue, style, onNewValue=_=>{}, ...rest }) {
	
	const [timeRange, setTimeRange] = useState(initialValue ?? "02:00 PM - 05:00 PM");
	useEffect(parseAndSetTimeRange, []);
	const [isDifferent, setIsDifferent] = useState(false);
	const parsedInitialValue = useMemo(() => parseTimeRange(initialValue))
	
	
	function checkIfDifferent() {
		const parsedTimeRange = parseTimeRange(timeRange);
		if(parsedTimeRange?.join("") === parsedInitialValue?.join(""))
			setIsDifferent(false);
		else
			setIsDifferent(true);
	}
	
	
	function parseAndSetTimeRange() {
		setTimeRange(prev => {
			const parsedTimeRange = parseTimeRange(prev);
			onNewValue(parsedTimeRange); // call it here so we use non-stale value, and so it only calls on end editing
			if(!parsedTimeRange) return "Invalid";
			return parsedTimeRange.map(time => superShortenTime(time, true)).join("-");
		});
	}
	
	
	function shortenTimeRange() {
		setTimeRange(prev => prev.replace(/pm/g, ""));
	}
	
	
	return (
		<StyledTextInput
			placeholder="H:MM-H:MM"
			value={timeRange}
			onChangeText={setTimeRange}
			onFocus={shortenTimeRange}
			onEndEditing={parseAndSetTimeRange}
			onBlur={checkIfDifferent}
			selectTextOnFocus
			color={isDifferent? "altAccent" : "veryHard"}
			{...rest}
		/>
	);
	
}
