import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useIsScreenFocused() {
	const [isFocused, setIsFocused] = useState(false);
	
	useFocusEffect(useCallback(() => {
		setIsFocused(true);
		return () => setIsFocused(false);
	}, []));
	
	return isFocused;
}
