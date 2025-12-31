import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import PayCycleCard from "@/components/pay-cycles/PayCycleCard.jsx";
import useFetchPayCycle from "@/hooks/useFetchPayCycle.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import If from "@/components/general-utility-components/If.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { useMemo } from "react";
import { ScrollView } from "react-native";


export default function SeePayCycles() {
	
	const params = useMemo(() => useGlobalState().params, []); // prevents other tabs from overwriting params
	let { user=null, currentPayCycles=null } = params;
	const isSupervisor = !!user;
	const {
		dateRange, payDay, previousPayCycleSummary, nextPayCycleSummary, updatePayCycle, payCycleSummary, loading
	} = useFetchPayCycle(user?.userId, currentPayCycles?.[user?.userId]);
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			<Gap size={5}/>
			<If condition={isSupervisor}>
				<BackButton/>
				<Gap size={15}/>
			</If>
			
			<StyledText look="24 medium hard" hCenter={false} style={{ width: "90%", marginHorizontal: "auto" }}>
				Pay cycle summary
			</StyledText>
			
			{!loading? (
				<ScrollView>
					<PayCycleCard
						dateRange={dateRange}
						payDay={payDay}
						onLeft={previousPayCycleSummary}
						onRight={nextPayCycleSummary}
						payCycleSummary={payCycleSummary}
						user={user}
						updatePayCycle={updatePayCycle}
					/>
				</ScrollView>
			) : (
				<LoadingText/>
			)}
		
		</SafeAreaViewWithBackground>
	);
	
}