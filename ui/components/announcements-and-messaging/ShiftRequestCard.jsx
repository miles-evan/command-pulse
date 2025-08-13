import Button from "@/components/project-specific-utility-components/Button.jsx"
import ShiftCard from "@/components/scheduling/my-schedule/ShiftCard.jsx";
import Contact from "@/components/contacts/Contact.jsx";
import If from "@/components/general-utility-components/If.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import * as shiftService from "@/services/shiftService.js";
import { useState } from "react";


export default function ShiftRequestCard({ shiftRequest }) {
	
	const { shiftRequestId, shift, message, isCover, timeSent } = shiftRequest;
	const { userId } = useGlobalState();
	const [loadingAccept, setLoadingAccept] = useState(false);
	
	
	async function accept() {
		setLoadingAccept(true);
		await shiftService.acceptShiftRequest(shiftRequestId);
		setLoadingAccept(false);
	}
	
	
	return (
		<ShiftCard
			shift={shift}
			HeaderComponent={isCover && userId !== shift.userId (
				<Contact user={{ firstName: shift.firstName, lastName: shift.lastName }}/>
			)}
			FooterComponent={
				<>
					<HorizontalLine/>
					<If condition={message}>
						<StyledText look="24 regular veryHard">{message}</StyledText>
					</If>
					<Button onPress={accept} disabled={loadingAccept}>Accept</Button>
				</>
			}
		/>
	);
	
}