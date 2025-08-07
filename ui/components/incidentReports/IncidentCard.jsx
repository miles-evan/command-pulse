import Card from "@/components/project-specific-utility-components/Card.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import If from "@/components/general-utility-components/If.jsx";
import Contact from "@/components/contacts/Contact.jsx";
import { shortDate } from "@/utils/newDateUtils.js";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";


export default function IncidentCard({ incident, showUser, onPress, editing, onDelete }) {

	const {
		incidentReportId,
		title,
		dateCreated,
		shift: { firstName, lastName, date: shiftDate, locationName }
	} = incident;
	
	return (
		<Card
			showPressFeedback
			onPress={onPress}
			showRemoveButton={editing}
			onDelete={() => onDelete(incidentReportId)}
		>
			<StyledText look="28 regular veryHard" hCenter={false}>{title}</StyledText>
			<If condition={showUser}>
				<Contact user={{ firstName, lastName }}/>
			</If>
			<StyledText look="24 light veryHard" hCenter={false}>{`Filed ${shortDate(dateCreated)}`}</StyledText>
			<HorizontalLine length="100%"/>
			<FlexRowSpaceBetween>
				<StyledText look="24 light veryHard" hCenter={false} numberOfLines={2} adjustsFontSizeToFit>
					{locationName}
				</StyledText>
				<StyledText look="24 light veryHard" hCenter={false}>{shortDate(shiftDate)}</StyledText>
			</FlexRowSpaceBetween>
		</Card>
	);
	
}