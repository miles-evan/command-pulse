import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import PayCycleCard from "@/components/pay-cycles/PayCycleCard.jsx";
import useFetchPayCycle from "@/hooks/useFetchPayCycle.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";


export default function MyPayCycles() {
	
	const {
		dateRange, payDay, previousPayCycleSummary, nextPayCycleSummary, payCycleSummary, isLoading
	} = useFetchPayCycle();
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			<Gap size={5}/>
			
			<StyledText look="24 medium hard" hCenter={false}>Pay cycle summary</StyledText>
			
			{!isLoading? (
				<PayCycleCard
					dateRange={dateRange}
					payDay={payDay}
					onLeft={previousPayCycleSummary}
					onRight={nextPayCycleSummary}
					payCycleSummary={payCycleSummary}
				/>
			) : (
				<LoadingText/>
			)}
		
		</SafeAreaViewWithBackground>
	);
	
}