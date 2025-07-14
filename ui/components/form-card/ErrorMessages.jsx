import {useContext, useEffect, useState} from "react";
import { FormContext } from "./FormCard.jsx";
import StyledText from "@/components/StyledText";


/**
 * ErrorMessages component displays validation errors like "password should be 5-20 characters"
 * @param validate validation function. takes an object with keys being the field names, returns { passed, errorMessages }
 * @param setErrorMessagesRef a reference whose .current will be set to the errorMessages setter. used in case you want
 * to add additional error messages after validation, for example if the api call fails
 */
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