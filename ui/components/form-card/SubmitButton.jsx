import {useContext, useEffect} from "react";
import { FormContext } from "./FormCard.jsx";
import Button from "@/components/Button";


export default function SubmitButton({ onSubmit, children="Submit" }) {
	
	const { submitRef, inputValuesRef, checkValidationRef } = useContext(FormContext);
	
	
	function submit() {
		if(checkValidationRef.current())
			onSubmit(inputValuesRef.current);
	}
	
	
	useEffect(() => {
		submitRef.current = submit;
	}, []);
	
	
	return <Button onPress={submit}>{children}</Button>;
	
}