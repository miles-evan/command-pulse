import { View } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Colors } from "@/constants/Colors.js";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import { shortDate, shortTime } from "@/utils/newDateUtils.js";


export default function Message({ message: messageObj }) {
	
	const { messageId, userId, firstName, lastName, timeSent, message, numLikes } = messageObj;
	
	return (
		<View style={{ width: "90%" }}>
			<FlexRowSpaceBetween>
				<StyledText>{firstName + " " + lastName}</StyledText>
				<StyledText>{shortDate(timeSent) + ", " + shortTime(timeSent)}</StyledText>
			</FlexRowSpaceBetween>
			
			<View style={{
				width: "100%",
				borderWidth: 1,
				borderColor: Colors.mediumSoft,
				borderRadius: 8,
				padding: 48,
				backgroundColor: soft,
			}}>
				<StyledText look="18 regular veryHard">
					{message}
				</StyledText>
			</View>
		</View>
	);
	
}