import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { shortDate, shortTime } from "@/utils/dateUtils.js";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";


export default function MessageSenderAndTime({ firstName, lastName, timeSent }) {
	
	return (
		<FlexRowSpaceBetween style={{ paddingHorizontal: 8, marginBottom: -4 }}>
			<StyledText look="15 regular accent" hCenter={false}>
				{firstName + " " + lastName}
			</StyledText>
			<StyledText look="15 regular accent" hCenter={false}>
				{shortDate(timeSent) + ", " + shortTime(timeSent)}
			</StyledText>
		</FlexRowSpaceBetween>
	);
	
}