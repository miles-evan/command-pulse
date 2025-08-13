import Button from "@/components/project-specific-utility-components/Button.jsx"
import ShiftCard from "@/components/scheduling/my-schedule/ShiftCard.jsx";
import Contact from "@/components/contacts/Contact.jsx";
import If from "@/components/general-utility-components/If.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";


export default function ShiftRequestCard({ shiftRequest }) {
	
	const { shiftRequestId, shift, message, isCover, timeSent } = shiftRequest;
	
	return (
		<ShiftCard
			shift={shift}
			HeaderComponent={isCover && (
				<Contact user={{ firstName: shift.firstName, lastName: shift.lastName }}/>
			)}
			FooterComponent={
				<>
					<HorizontalLine/>
					<StyledText look="24 regular veryHard">{`${isCover? "Cover" : "Shift"} Request`}</StyledText>
					<If condition={message}>
						<StyledText look="18 regular veryHard">{message}</StyledText>
					</If>
					<Button>Accept</Button>
				</>
			}
		/>
	);
	
}