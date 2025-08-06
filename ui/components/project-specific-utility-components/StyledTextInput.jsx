import { TextInput } from "react-native";
import { Colors } from "@/constants/Colors.js";
import { useState } from "react";


export default function StyledTextInput({ style, initialValue, color, bigMode=false, valueRef, ...rest }) {
	
	const [value, setValue] = useState(initialValue ?? "");
	
	
	if(valueRef) valueRef.current = value;
	
	
	return (
		<TextInput
			style={{
				height: 50,
				borderColor: Colors.soft,
				borderWidth: 1,
				borderRadius: 8,
				paddingHorizontal: 8,
				textAlign: "center",
				color: Colors[color] ?? Colors.veryHard,
				...(bigMode? {
					height: 250,
					fontSize: 20,
					textAlign: "left",
					textAlignVertical: "top",
					paddingHorizontal: 12,
					paddingVertical: 12,
				} : {}),
				...style,
			}}
			placeholderTextColor={Colors.medium}
			value={value}
			onChangeText={setValue}
			{...(bigMode? { multiline: true, ...rest } : rest)}
		/>
	)
	
}