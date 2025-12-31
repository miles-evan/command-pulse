import { TextInput } from "react-native";
import { Colors } from "@/constants/Colors.js";
import { useState } from "react";

// bigMode makes the text box larger, with larger text, and text at top right
// bigTextMode is the same thing but without the box itself being larger
export default function StyledTextInput({
    style,
	initialValue,
	color,
	bigTextMode=false,
	bigMode=false,
	valueRef,
	setValueRef,
	whiteTintedBackground=false,
	...rest
}) {
	
	const [value, setValue] = useState(initialValue ?? "");
	
	if(valueRef) valueRef.current = value;
	if(setValueRef) setValueRef.current = setValue;
	
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
				...(bigMode || bigTextMode? {
					fontSize: 20,
					textAlign: "left",
					textAlignVertical: "top",
					paddingHorizontal: 12,
					paddingVertical: 12,
				} : {}),
				...(bigMode? {
					minHeight: 250,
					height: 250,
				} : {}),
				...(whiteTintedBackground? {
					backgroundColor: "rgba(255, 255, 255, 0.75)",
				} : {}),
				...style,
			}}
			placeholderTextColor={Colors.medium}
			value={value}
			onChangeText={setValue}
			{...(bigMode? { multiline: true } : {})}
			{...rest}
		/>
	)
	
}