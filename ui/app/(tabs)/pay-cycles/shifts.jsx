import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import ShiftCard from "@/components/scheduling/my-schedule/ShiftCard.jsx";
import { ScrollView } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import { breakUpKeyValuePairs, labelKeysAndValues } from "@/utils/objectUtils.js";
import * as payCycleService from "@/services/payCycleService.js";
import { useState } from "react";
import If from "@/components/general-utility-components/If.jsx";
import { router } from "expo-router";


export default function Shifts() {
	
	const globalState = useGlobalState();
	const { user, shifts, dateRange, payCycleId, paymentSent, updatePayCycle } = globalState.params;
	const isSupervisor = !!user;
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [revisions, setRevisions] = useState({});
	
	// not the best practice, but I don't want to prop drill or use the context api
	globalState.context = { revisions, setRevisions, paymentSent }
	
	
	async function submitRevisions() {
		setLoadingSubmit(true);
		const hoursWorkedRevisions =
			labelKeysAndValues(breakUpKeyValuePairs(globalState.context.revisions), "shiftId", "hoursWorked");
		if(payCycleId) await payCycleService.reviseHours(null, null, null, payCycleId, hoursWorkedRevisions);
		else await payCycleService.reviseHours(user.userId, ...dateRange, null, hoursWorkedRevisions);
		updatePayCycle();
		router.back();
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			<BackButton style={{ marginVertical: 5 }}/>
			
			<StyledText look="22 medium veryHard" hCenter={false} style={{ width: "90%", marginHorizontal: "auto" }}>
				Shifts
			</StyledText>
			
			<If condition={isSupervisor && !paymentSent}>
				<Button
					look="white"
					onPress={submitRevisions}
					disabled={loadingSubmit || Object.keys(revisions).length === 0}
					style={{ marginVertical: 15 }}
				>
					Submit revisions
				</Button>
			</If>
			
			<ScrollView>
				{shifts.map(shift => (
					<ShiftCard
						key={shift.shiftId}
						shift={shift}
						mode={`pay cycle ${isSupervisor? "supervisor" : "officer"}`}
					/>
				))}
			</ScrollView>
		
		</SafeAreaViewWithBackground>
	);
	
}