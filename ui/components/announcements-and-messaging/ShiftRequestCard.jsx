import Button from "@/components/project-specific-utility-components/Button.jsx"
import ShiftCard from "@/components/scheduling/my-schedule/ShiftCard.jsx";
import Contact from "@/components/contacts/Contact.jsx";
import If from "@/components/general-utility-components/If.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";


export default function ShiftRequestCard({ shiftRequest: { shift, message, isCover } }) {
	
	return (
		<ShiftCard
			shift={shift}
			HeaderComponent={
				<If condition={isCover}>
					<Contact user={{ firstName: shift.firstName, lastName: shift.lastName }}/>
				</If>
			}
			FooterComponent={
				<>
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