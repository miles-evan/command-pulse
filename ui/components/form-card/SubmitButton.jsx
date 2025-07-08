import {useContext, useEffect} from "react";
import { FormContext } from "./FormCard.jsx";
import Button from "@/components/Button";
import {router} from "expo-router";
import { useLocalSearchParams } from "expo-router";


export default function SubmitButton({ onSubmit, to, children="Submit" }) {
	
	const { submitRef, inputValuesRef, checkValidationRef } = useContext(FormContext);
	const params = useLocalSearchParams();
	
	
	function submit() {
		if(!checkValidationRef.current()) return;
		
		if(!to) return onSubmit(inputValuesRef.current);
		
		router.push({
			pathname: to,
			params: { ...params, ...inputValuesRef.current }
		});
	}
	
	
	useEffect(() => {
		submitRef.current = submit;
	}, []);
	
	
	return <Button onPress={submit}>{children}</Button>;
	
}