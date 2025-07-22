import { useEffect, useMemo, useState } from "react";
import { parseTimeRange, superShortenTime } from "@/utils/dateUtils.js";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";


export default function TimeRangeInput({ initialValue, style, onNewValue=_=>{}, ...rest }) {
	
	const [timeRange, setTimeRange] = useState(initialValue ?? "02:00 PM - 05:00 PM");
	useEffect(parseAndSetTimeRange, []);
	const [isDifferent, setIsDifferent] = useState(false);
	const parsedInitialValue = useMemo(() => parseTimeRange(initialValue));
	const [selection, setSelection] = useState(null);
	
	
	function onChangeText(newText) {
		setTimeRange(newText);
		setSelection(null);
	}
	
	
	function onFocus() {
		setTimeRange(prev => {
			const newTimeRange = prev.replace(/pm/g, "")
			setSelection({ start: 0, end: newTimeRange.length });
			return newTimeRange;
		});
	}
	
	
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
	
	
	return (
		<StyledTextInput
			placeholder="H:MM-H:MM"
			value={timeRange}
			onChangeText={onChangeText}
			onFocus={onFocus}
			onEndEditing={parseAndSetTimeRange}
			onBlur={checkIfDifferent}
			selection={selection}
			color={timeRange === "Invalid"? "danger" : isDifferent? "altAccent" : "veryHard"}
			{...rest}
		/>
	);
	
}
