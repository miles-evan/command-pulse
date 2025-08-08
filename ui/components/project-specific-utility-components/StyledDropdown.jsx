import { Colors } from "@/constants/Colors.js";
import { Dropdown } from "react-native-element-dropdown";
import * as React from "react";


export default function StyledDropdown({ data, value, onChange, style, whiteTintedBackground, ...rest }) {
	
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
			value={value}
			onChange={onChange}
			{...rest}
		/>
	);
	
}