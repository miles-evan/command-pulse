import { useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";


export default function ScheduleIndex() {
	
	const globalState = useGlobalState();
	const [isFocused, setIsFocused] = useState(false);
	
	
	useFocusEffect(() => {
		setIsFocused(true);
		return () => setIsFocused(false);
	});
	
	
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