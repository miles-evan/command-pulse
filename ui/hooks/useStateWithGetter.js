import { useState } from "react";

// solves the problem of setting state and not immediately having it
export default function useStateWithGetter(initialValue) {
	const [state, setState] = useState(initialValue);
	
	function getState() {
		return new Promise(resolve => {
			setState(current => {
				resolve(current);
				return current;
			});
		});
	}
	
	return [state, setState, getState];
}