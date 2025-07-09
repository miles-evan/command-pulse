import {useContext, useEffect, useState} from "react";
import { FormContext } from "./FormCard.jsx";
import {Text} from "react-native";
import StyledText from "@/components/StyledText";


export default function ErrorMessages({ validate, setErrorMessagesRef }) {
	
	const [errorMessages, setErrorMessages] = useState([]);
	const { inputValuesRef, checkValidationRef } = useContext(FormContext);
	
	
	useEffect(() => {
		if(setErrorMessagesRef)
			setErrorMessagesRef.current = setErrorMessages;
	}, []);
	
	
	checkValidationRef.current = async () => {
		const { errorMessages: newErrorMessages, passed } = await validate(inputValuesRef.current);
		setErrorMessages(newErrorMessages);
		return passed;
	}
	
	
	return errorMessages.map(
		(e, i) => <StyledText look="14 semibold veryHard" key={i}>{e}</StyledText>
	);
	
}