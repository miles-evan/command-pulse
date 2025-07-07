import { useContext, useEffect, useRef } from "react";
import { FormContext } from "./FormCard.jsx";
import {TextInput} from "react-native";


export default function InputBubble({ fieldName, placeholder, type="text", submitOnEnter=false }) {
	
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
		/>
	);
}