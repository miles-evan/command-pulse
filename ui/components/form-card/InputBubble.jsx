import { useContext, useEffect, useRef } from "react";
import { FormContext } from "./FormCard.jsx";
import { TextInput, StyleSheet } from "react-native";
import {FontWeights} from "@/constants/Typography";
import {Colors} from "@/constants/Colors";


export default function InputBubble({ fieldName, placeholder, submitOnEnter=false, style={} }) {
	
	const { inputValuesRef, submitRef } = useContext(FormContext);
	
	
	useEffect(() => {
		inputValuesRef.current[fieldName] = "";
	}, []);
	
	
	return (
		<TextInput
			placeholder={placeholder ?? fieldName}
			onChangeText={value => inputValuesRef.current[fieldName] = value}
			onSubmitEditing={() => {
				if(submitOnEnter) submitRef.current();
			}}
			placeholderTextColor={Colors.accent}
			style={getStyles(style).inputBubble}
		/>
	);
}


function getStyles(style) {
	return StyleSheet.create({
		inputBubble: {
			fontSize: 20,
			fontWeight: FontWeights.regular,
			color: Colors.accent,
			
			width: "90%",
			height: 44,
			
			paddingLeft: 15,
			
			borderRadius: 48,
			
			marginHorizontal: "auto",
			marginVertical: 8,
			
			backgroundColor: Colors.verySoft,
			borderWidth: 1,
			borderColor: Colors.soft,
			
			...style
		}
	});
}