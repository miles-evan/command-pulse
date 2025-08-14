import { useState } from "react";

// solves the problem of setting state and not immediately having it
// now you can get the most recent, non-stale value with the async getter,
// and you can await the setter until it actually sets, and get the new value with it
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
	
	function asyncSetState(valueOrUpdaterFunction) {
		return new Promise(resolve => {
			setState(prev => {
				resolve(prev);
				try {
					return valueOrUpdaterFunction(prev);
				} catch(_) {
					return valueOrUpdaterFunction;
				}
			});
		});
	}
	
	return [state, asyncSetState, getState];
}