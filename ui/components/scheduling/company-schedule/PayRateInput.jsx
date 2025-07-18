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
	
	
	return (
		<StyledTextInput
			keyboardType="numeric"
			value={value}
			onChangeText={newText => {
				setValue(newText);
				setSelection(null);
			}}
			selectTextOnFocus={true}
			selection={selection}
			onFocus={() => {
				const strValue = String(payRate);
				setValue(strValue);
				setSelection({ start: 0, end: strValue.length });
			}}
			onEndEditing={() => {
				setSelection(null);
				
				const newPayRate = Number(value);
				if (isNaN(newPayRate)) {
					setValue(formatPayRate(payRate));
				} else {
					setPayRate(newPayRate);
					setValue(formatPayRate(newPayRate));
				}
				
				setIsDifferent(newPayRate !== initialValue);
			}}
			color={isDifferent? Colors.altAccent : Colors.veryHard}
		/>
	);
	
}