import { useEffect, useMemo, useState } from "react";
import { formatTimeRange, parseTimeRange } from "@/utils/newDateUtils.js";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";


export default function TimeRangeInput({ initialValue, style, onNewValue=_=>{}, date, ...rest }) {
	
	console.log("TimeRangeInput initialValue", initialValue)
	const [timeRange, setTimeRange] = useState(initialValue? formatTimeRange(initialValue) : "2-5");
	useEffect(parseAndSetTimeRange, []);
	const [isDifferent, setIsDifferent] = useState(false);
	const parsedInitialValue = useMemo(() => parseTimeRange(initialValue? formatTimeRange(initialValue) : "2-5", date));
	const [selection, setSelection] = useState(null);
	
	
	function onFocus() {
		setTimeRange(prev => {
			const newTimeRange = prev.replace(/pm/g, "").replace(/:00/g, "");
			setSelection({ start: 0, end: newTimeRange.length });
			return newTimeRange;
		});
	}
	
	
	function checkIfDifferent() {
		const parsedTimeRange = parseTimeRange(timeRange, date);
		setIsDifferent(formatTimeRange(parsedTimeRange) !== formatTimeRange(parsedInitialValue))
	}
	
	
	function parseAndSetTimeRange() {
		setTimeRange(prev => {
			const parsedTimeRange = parseTimeRange(prev, date);
			onNewValue(parsedTimeRange); // call it here so we use non-stale value, and so it only calls on end editing
			if(!parsedTimeRange) return "Invalid";
			const result = formatTimeRange(parsedTimeRange);
			console.log("parsedTimeRange", parsedTimeRange);
			console.log("parseAndSetTimeRange formatTimeRange(parsedTimeRange)", result);
			return result;
		});
	}
	
	
	return (
		<StyledTextInput
			placeholder="H:MM-H:MM"
			value={timeRange}
			onChangeText={newText => {setTimeRange(newText); setSelection(null);}}
			onFocus={onFocus}
			onEndEditing={parseAndSetTimeRange}
			onBlur={checkIfDifferent}
			selection={selection}
			color={timeRange === "Invalid"? "danger" : isDifferent? "altAccent" : "veryHard"}
			{...rest}
		/>
	);
	
}
