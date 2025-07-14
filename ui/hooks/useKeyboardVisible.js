import { useEffect, useState } from "react";
import { Keyboard } from "react-native";


export default function useKeyboardVisible() {
	
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	
	
	useEffect(() => {
		const showSub = Keyboard.addListener("keyboardWillShow", () => setKeyboardVisible(true));
		const hideSub = Keyboard.addListener("keyboardWillHide", () => setKeyboardVisible(false));
		
		return () => {
			showSub.remove();
			hideSub.remove();
		};
	}, []);
	
	
	return keyboardVisible;
	
}
