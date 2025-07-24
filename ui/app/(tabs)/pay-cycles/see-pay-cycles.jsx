import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import PayCycleCard from "@/components/pay-cycles/PayCycleCard.jsx";
import useFetchPayCycle from "@/hooks/useFetchPayCycle.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import If from "@/components/general-utility-components/If.jsx";
import Contact from "@/components/contacts/Contact.jsx";


export default function SeePayCycles() {
	
	let user = useLocalSearchParams();
	if(Object.keys(user).length === 0) user = null;
	const {
		dateRange, payDay, previousPayCycleSummary, nextPayCycleSummary, updatePayCycle, payCycleSummary, isLoading
	} = useFetchPayCycle(user?.userId);
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			
			<Gap size={5}/>
			<If condition={user}>
				<BackButton/>
				<Gap size={15}/>
			</If>
			
			<StyledText look="24 medium hard" hCenter={false} style={{ width: "90%", marginHorizontal: "auto" }}>
				Pay cycle summary
			</StyledText>
			
			{!isLoading? (
				<PayCycleCard
					dateRange={dateRange}
					payDay={payDay}
					onLeft={previousPayCycleSummary}
					onRight={nextPayCycleSummary}
					payCycleSummary={payCycleSummary}
					user={user}
					updatePayCycle={updatePayCycle}
				/>
			) : (
				<LoadingText/>
			)}
		
		</SafeAreaViewWithBackground>
	);
	
}