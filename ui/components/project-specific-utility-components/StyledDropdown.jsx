import { Colors } from "@/constants/Colors.js";
import { Dropdown } from "react-native-element-dropdown";
import * as React from "react";


export default function StyledDropdown({ data, value, onChange, ...rest }) {
	
	return (
		<Dropdown
			style={{
				height: 50,
				borderColor: Colors.soft,
				borderWidth: 1,
				borderRadius: 8,
				paddingHorizontal: 8,
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