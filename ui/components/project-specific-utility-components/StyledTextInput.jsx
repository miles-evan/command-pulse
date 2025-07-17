import { TextInput } from "react-native";
import { Colors } from "@/constants/Colors.js";
import { useState } from "react";


export default function StyledTextInput({ style, initialValue, color, ...rest }) {
	
	const [value, setValue] = useState(initialValue ?? "");
	
	
	return (
		<TextInput
			style={{
				height: 50,
				borderColor: Colors.soft,
				borderWidth: 1,
				borderRadius: 8,
				paddingHorizontal: 8,
				textAlign: "center",
				color: color ?? Colors.veryHard,
				...style
			}}
			placeholderTextColor={Colors.medium}
			value={value}
			onChangeText={setValue}
			{...rest}
		/>
	)
	
}