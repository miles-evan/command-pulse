import Card from "@/components/project-specific-utility-components/Card.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import LeftRightSelector from "@/components/project-specific-utility-components/LeftRightSelector.jsx";
import { formatDateRange, shortDate } from "@/utils/newDateUtils.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import If from "@/components/general-utility-components/If.jsx";
import Contact from "@/components/contacts/Contact.jsx";
import * as payCycleService from "@/services/payCycleService.js";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import FlexRow from "@/components/general-utility-components/FlexRow.jsx";


export default function PayCycleCard({ dateRange, payDay, payCycleSummary, user, onLeft, onRight, updatePayCycle }) {
	
	const globalState = useGlobalState();
	const isSupervisor = !!user;
	const {
		totalHoursWorked,
		totalHoursWorkedRevised,
		totalEarning,
		totalEarningRevised,
		payCycle,
		shifts,
	} = payCycleSummary;
	const { payCycleId=null, paymentSent=false, paymentReceived=false, paymentMethod=null } = payCycle ?? {};
	
	
	async function confirmSent() {
		if(payCycleId) await payCycleService.confirmSent(null, null, null, payCycleId);
		else await payCycleService.confirmSent(user.userId, ...dateRange);
		await updatePayCycle();
	}
	
	async function confirmReceived() {
		await payCycleService.confirmReceived(payCycleId);
		await updatePayCycle();
	}
	
	
	function seeShifts() {
		globalState.params = { user, shifts, dateRange, payCycleId, paymentSent, updatePayCycle }
		router.push("/(tabs)/pay-cycles/shifts")
	}
	
	
	return (
		<Card>
			{isSupervisor && (
				<Contact user={user} style={{ marginHorizontal: "auto", marginTop: -5, marginBottom: 5 }}/>
			)}
			
			
			<LeftRightSelector onLeft={onLeft} onRight={onRight}>{formatDateRange(dateRange)}</LeftRightSelector>
			
			<Gap size={16}/>
			
			<StyledText look="25 light veryHard" hCenter={false}>
				{`Payday: ${shortDate(payDay)}`}
			</StyledText>
			
			<HorizontalLine color="soft" length={"100%"}/>
			
			<FlexRow>
				<StyledText look="25 light veryHard" hCenter={false}>
					{"Worked: "}
				</StyledText>
				<StyledText look="25 light accent" hCenter={false} onPress={seeShifts}>
					{`${totalHoursWorkedRevised}hrs`}
				</StyledText>
			</FlexRow>
			
			<StyledText look="25 light veryHard" hCenter={false}>
				{`Average pay rate: $${totalHoursWorkedRevised === 0? 0 : (totalEarningRevised / totalHoursWorkedRevised).toFixed(2)}/hr`}
			</StyledText>
			<StyledText look="25 semibold veryHard" hCenter={false}>
				{`Total: $${totalEarningRevised}`}
			</StyledText>
			
			<HorizontalLine color="soft" length={"100%"}/>
			
			<StyledText look="25 light veryHard">
				{paymentReceived? `Payment received (${paymentMethod})` : paymentSent? `Payment sent (${paymentMethod})` : "Payment not yet sent"}
			</StyledText>
			<If condition={!isSupervisor && paymentSent && !paymentReceived}>
				<Button style={{ width: "100%" }} onPress={confirmReceived}>Confirm received</Button>
			</If>
			<If condition={isSupervisor && !paymentSent}>
				<Button style={{ width: "100%" }} onPress={confirmSent}>Confirm sent</Button>
			</If>
			
		</Card>
	);
	
}