import {useContext, useEffect, useState} from "react";
import { FormContext } from "./FormCard.jsx";
import Button from "@/components/Button";
import {router} from "expo-router";
import { useLocalSearchParams } from "expo-router";


export default function SubmitButton({ onSubmit, to, children="Submit" }) {
	
	const { submitRef, inputValuesRef, checkValidationRef } = useContext(FormContext);
	const params = useLocalSearchParams();
	const [buttonDisabled, setButtonDisabled] = useState(false);
	
	
	async function submit() {
		if(buttonDisabled) return;
		
		setButtonDisabled(true);
		
		if(!await checkValidationRef.current()) {
			setButtonDisabled(false);
			return;
		}
		
		if(!to) {
			await onSubmit(inputValuesRef.current);
			setButtonDisabled(false);
			return;
		}
		
		setButtonDisabled(false);
		
		router.push({
			pathname: to,
			params: { ...params, ...inputValuesRef.current }
		});
	}
	
	
	useEffect(() => {
		submitRef.current = submit;
	}, [submit]);
	
	
	return <Button onPress={submit} disabled={buttonDisabled}>{children}</Button>;
	
}