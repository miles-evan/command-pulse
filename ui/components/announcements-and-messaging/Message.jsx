import { View } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Colors } from "@/constants/Colors.js";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import { shortDate, shortTime } from "@/utils/newDateUtils.js";
import If from "@/components/general-utility-components/If.jsx";


export default function Message({ message: messageObj, withNameAndTime=true }) {
	
	const { messageId, userId, firstName, lastName, timeSent, message, numLikes } = messageObj;
	
	return (
		<>
			<If condition={withNameAndTime} key="name and time">
				<FlexRowSpaceBetween style={{ paddingHorizontal: 8, marginBottom: -3 }}>
					<StyledText look="15 regular accent" hCenter={false}>
						{firstName + " " + lastName}
					</StyledText>
					<StyledText look="15 regular accent" hCenter={false}>
						{shortDate(timeSent) + ", " + shortTime(timeSent)}
					</StyledText>
				</FlexRowSpaceBetween>
			</If>
			
			<View key="message" style={{
				width: "100%",
				borderWidth: 2,
				borderColor: Colors.softer,
				borderRadius: 8,
				paddingHorizontal: 12,
				paddingVertical: 6,
				backgroundColor: Colors.blendColors("softer", "verySoft"),
			}}>
				<StyledText look="18 regular veryHard" hCenter={false}>
					{message}
				</StyledText>
			</View>
		</>
	)
	
}