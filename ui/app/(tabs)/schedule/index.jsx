import { useContext, useEffect } from "react";
import { GlobalStateContext } from "@/utils/GlobalStateContext.js";
import { router } from "expo-router";


export default function ScheduleIndex() {
	
	const globalState = useContext(GlobalStateContext);

	
	useEffect(() => {
		if(globalState.isSupervisor) {
			router.replace("/(tabs)/schedule/company-schedule");
		} else {
			router.replace("/(tabs)/schedule/my-schedule");
		}
	}, []);


	return null;

}