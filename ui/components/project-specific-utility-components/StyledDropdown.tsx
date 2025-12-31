import { Colors } from "@/constants/Colors.js";
import { Dropdown } from "react-native-element-dropdown";
import * as React from "react";
import { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";


export default function StyledDropdown<V>({ data, value, onChange, style, whiteTintedBackground, ...rest }: {
	data: Array<{ label: string; value: V }>,
	value?: V
	onChange?: (value: { label: string, value: V }) => void,
	style?: React.CSSProperties,
	whiteTintedBackground?: boolean
}) {
	
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
			} as StyleProp<ViewStyle>}
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