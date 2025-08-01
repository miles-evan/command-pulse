import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";


export default function useKeyboardVisible() {
	
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	
	
	useEffect(() => {
		const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
		
		const showSub = Keyboard.addListener(showEvent, () => setKeyboardVisible(true));
		const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardVisible(false));
		
		return () => {
			showSub.remove();
			hideSub.remove();
		};
	}, []);
	
	
	return keyboardVisible;
	
}
