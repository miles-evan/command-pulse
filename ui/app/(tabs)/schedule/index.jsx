import { useContext, useEffect } from "react";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";


export default function ScheduleIndex() {
	
	const globalState = useGlobalState();

	
	useEffect(() => {
		if(globalState.isSupervisor) {
			router.replace("/(tabs)/schedule/company-schedule");
		} else {
			router.replace("/(tabs)/schedule/my-schedule");
		}
	}, []);


	return null;

}