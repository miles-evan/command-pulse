import Card from "@/components/project-specific-utility-components/Card.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import LeftRightSelector from "@/components/project-specific-utility-components/LeftRightSelector.jsx";
import { formatDateRange, shortenDate } from "@/utils/dateUtils.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import If from "@/components/general-utility-components/If.jsx";
import Contact from "@/components/contacts/Contact.jsx";


export default function PayCycleCard({ dateRange, payDay, payCycleSummary, user, onLeft, onRight }) {
	
	const {
		totalHoursWorked,
		totalHoursWorkedRevised,
		totalEarning,
		totalEarningRevised,
		payCycle,
		shifts,
	} = payCycleSummary;
	
	const { payCycleID=null, paymentSent=false, paymentReceived=false, paymentMethod=null } = payCycle ?? {};
	
	return (
		<Card>
			<If condition={user}>
				<Contact user={user} style={{ marginHorizontal: "auto", marginTop: -5, marginBottom: 5 }}/>
			</If>
			
			<LeftRightSelector onLeft={onLeft} onRight={onRight}>{formatDateRange(dateRange)}</LeftRightSelector>
			
			<Gap size={16}/>
			
			<StyledText look="25 light veryHard" hCenter={false}>
				{`Payday: ${shortenDate(payDay)}`}
			</StyledText>
			
			<HorizontalLine color="soft" length={"100%"}/>
			
			<StyledText look="25 light veryHard" hCenter={false}>
				{`Worked: ${totalHoursWorkedRevised}hrs`}
			</StyledText>
			<StyledText look="25 light veryHard" hCenter={false}>
				{`Average pay rate: $${totalHoursWorkedRevised === 0? 0 : totalEarningRevised / totalHoursWorkedRevised}/hr`}
			</StyledText>
			<StyledText look="25 semibold veryHard" hCenter={false}>
				{`Total: $${totalEarningRevised}`}
			</StyledText>
			
			<HorizontalLine color="soft" length={"100%"}/>
			
			<StyledText look="25 light veryHard">
				{paymentSent? `Payment sent. Method: ${paymentMethod}` : "Payment not yet sent"}
			</StyledText>
			<If condition={paymentSent}>
				<Button style={{ width: "100%" }}>Confirm received</Button>
			</If>
			
		</Card>
	);
	
}