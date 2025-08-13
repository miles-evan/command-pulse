import Button from "@/components/project-specific-utility-components/Button.jsx"
import ShiftCard from "@/components/scheduling/my-schedule/ShiftCard.jsx";
import If from "@/components/general-utility-components/If.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import * as shiftService from "@/services/shiftService.js";
import { useState } from "react";
import { Colors } from "@/constants/Colors.js";
import MessageSenderAndTime from "@/components/announcements-and-messaging/MessageSenderAndTime.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";


export default function ShiftRequestCard({ shiftRequest }) {
	
	const { shiftRequestId, shift, message, isCover, timeSent, userId, firstName, lastName } = shiftRequest;
	const [loadingAccept, setLoadingAccept] = useState(false);
	const [accepted, setAccepted] = useState(false);
	const { userId: myUserId } = useGlobalState();
	
	
	async function accept() {
		setLoadingAccept(true);
		const response = await shiftService.acceptShiftRequest(shiftRequestId);
		setLoadingAccept(false);
		if(response.ok) setAccepted(true);
	}
	
	
	return (
		<>
			<MessageSenderAndTime timeSent={timeSent} firstName={firstName} lastName={lastName}/>
			
			<ShiftCard
				shift={shift}
				mode="plain"
				FooterComponent={
					<>
						<HorizontalLine style={{ width: "100%" }}/>
						<If condition={message}>
							<StyledText look="24 regular veryHard">{message}</StyledText>
						</If>
						{!accepted? (
							<Button onPress={accept} disabled={loadingAccept} style={{ width: "100%" }}>Accept</Button>
						) : (
							<StyledText look="20 light veryHard">Accepted</StyledText>
						)}
					</>
				}
				style={{
					width: "100%",
					backgroundColor: Colors.blend("softer", "verySoft"),
					borderColor: Colors.softer,
					borderWidth: 4,
					borderRadius: 8,
				}}
			/>
		</>
	);
	
}