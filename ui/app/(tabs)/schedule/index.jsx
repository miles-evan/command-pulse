import { useEffect } from "react";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { useIsScreenFocused } from "@/hooks/useIsScreenFocused.js";


export default function ScheduleIndex() {
	
	const globalState = useGlobalState();
	const isFocused = useIsScreenFocused();
	
	
	useEffect(() => {
		if(!isFocused) return;
		if(globalState.isSupervisor) {
			router.replace("/(tabs)/schedule/company-schedule");
		} else {
			router.replace("/(tabs)/schedule/my-schedule");
		}
	}, [isFocused]);
	
	
	return null;

}