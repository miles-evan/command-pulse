import React, { useRef } from "react";
import Card from "@/components/Card";


export const FormContext = React.createContext();


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