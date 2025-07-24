import Card from "@/components/project-specific-utility-components/Card.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import LeftRightSelector from "@/components/project-specific-utility-components/LeftRightSelector.jsx";
import { formatDateRange } from "@/utils/dateUtils.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";


export default function PayCycleCard({ dateRange, payDay, payCycleSummary, onLeft, onRight }) {
	
	const { totalHoursWorked, totalHoursWorkedRevised, totalEarning, totalEarningRevised, payCycle, shifts } = payCycleSummary;
	
	return (
		<Card>
			<LeftRightSelector onLeft={onLeft} onRight={onRight}>{formatDateRange(dateRange)}</LeftRightSelector>
			<Gap size={16}/>
			<StyledText look="25 light veryHard" hCenter={false}>
				{`Payday: ${payDay}`}
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
			
		</Card>
	);
	
}