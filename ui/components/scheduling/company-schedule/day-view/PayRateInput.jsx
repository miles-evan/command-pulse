import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors.js";


export default function PayRateInput({ initialValue, onNewValue=_=>{} }) {
	
	const [payRate, setPayRate] = useState(initialValue ?? 0);
	const [value, setValue] = useState(formatPayRate(payRate));
	const [selection, setSelection] = useState(null);
	const [isDifferent, setIsDifferent] = useState(false);
	
	
	function formatPayRate(payRate) {
		return `$${payRate}/hr`
	}
	
	
	useEffect(() => {
		onNewValue(payRate);
	}, [payRate]);
	
	
	function onChangeText(newText) {
		setValue(newText);
		setSelection(null);
	}
	
	
	function onFocus() {
		const strValue = String(payRate);
		setValue(strValue);
		setSelection({ start: 0, end: strValue.length });
	}
	
	
	function onEndEditing() {
		setSelection(null);
		
		const newPayRate = Number(value);
		if (isNaN(newPayRate)) {
			setValue(formatPayRate(payRate));
		} else {
			setPayRate(newPayRate);
			setValue(formatPayRate(newPayRate));
		}
		
		setIsDifferent(newPayRate !== initialValue);
	}
	
	
	return (
		<StyledTextInput
			keyboardType="numeric"
			value={value}
			onChangeText={onChangeText}
			selection={selection}
			onFocus={onFocus}
			onEndEditing={onEndEditing}
			color={isDifferent? "altAccent" : "veryHard"}
		/>
	);
	
}