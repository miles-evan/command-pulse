import {useContext, useEffect, useState} from "react";
import { FormContext } from "./FormCard.jsx";
import {Text} from "react-native";


export default function ErrorMessages({ validate, setErrorMessagesRef }) {
	
	const [errorMessages, setErrorMessages] = useState([]);
	const { inputValuesRef, checkValidationRef } = useContext(FormContext);
	
	
	useEffect(() => {
		if(setErrorMessagesRef)
			setErrorMessagesRef.current = setErrorMessages;
	}, []);
	
	
	checkValidationRef.current = () => {
		const { errorMessages: newErrorMessages, passed } = validate(inputValuesRef.current);
		setErrorMessages(newErrorMessages);
		return passed;
	};
	
	
	return errorMessages.map((e, i) => <Text key={i}>{e}</Text>);
	
}