import { TextInput } from "react-native";
import { Colors } from "@/constants/Colors.js";
import { useState } from "react";


export default function StyledTextInput({ style, initialValue, ...rest }) {
	
	const [value, setValue] = useState(initialValue ?? "");
	
	
	return (
		<TextInput
			style={{
				height: 50, borderColor: Colors.soft, borderWidth: 1, borderRadius: 8,
				paddingHorizontal: 8, ...style
			}}
			placeholderTextColor={Colors.medium}
			selectionColor={Colors.veryHard}
			value={value}
			onChangeText={setValue}
			{...rest}
		/>
	)
	
}