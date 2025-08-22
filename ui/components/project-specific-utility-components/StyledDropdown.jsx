import { Colors } from "@/constants/Colors.js";
import { Dropdown } from "react-native-element-dropdown";
import * as React from "react";
import { useState } from "react";


export default function StyledDropdown({ data, value, onChange, style, whiteTintedBackground, ...rest }) {
	
	const [val, setVal] = useState(value);
	
	return (
		<Dropdown
			style={{
				height: 50,
				borderColor: Colors.soft,
				borderWidth: 1,
				borderRadius: 8,
				paddingHorizontal: 8,
				...(whiteTintedBackground? {
					backgroundColor: "rgba(255, 255, 255, 0.75)",
				} : {}),
				...style
			}}
			maxHeight={300}
			selectedTextStyle={{ color: Colors.veryHard }}
			labelField="label"
			valueField="value"
			data={data}
			value={value ?? val}
			onChange={newVal => {
				onChange?.(newVal);
				setVal(newVal);
			}}
			{...rest}
		/>
	);
	
}