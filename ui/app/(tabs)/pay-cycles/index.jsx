import { useEffect } from "react";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { useIsScreenFocused } from "@/hooks/useIsScreenFocused.js";


export default function PayCycleIndex() {
	
	const globalState = useGlobalState();
	const isFocused = useIsScreenFocused();
	
	
	useEffect(() => {
		if(!isFocused) return;
		if(globalState.isSupervisor) {
			router.replace("/(tabs)/pay-cycles/contacts-list");
		} else {
			router.replace("/(tabs)/pay-cycles/see-pay-cycles");
		}
	}, [isFocused]);
	
	
	return null;
	
}