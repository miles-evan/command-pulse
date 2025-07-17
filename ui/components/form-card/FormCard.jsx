import React, { useRef } from "react";
import Card from "@/components/project-specific-utility-components/Card.jsx";


export const FormContext = React.createContext();


/**
 * FormCard component
 * Makes forms easy by automatically extracting values out of InputBubbles when
 * calling submit function and validation function
 * Put inside: FormHeader, InputBubble(s), ErrorMessages (optional), SubmitButton
 */
export default function FormCard({ children, style }) {

	const inputValuesRef = useRef({});
	const submitRef = useRef(() => {});
	const checkValidationRef = useRef(() => true);

	return (
		<FormContext.Provider value={{ inputValuesRef, submitRef, checkValidationRef }}>
			<Card style={style}>
				{children}
			</Card>
		</FormContext.Provider>
	);
}