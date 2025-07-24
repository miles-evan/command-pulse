import PersonIcon from "@/components/contacts/PersonIcon.jsx";
import FlexRow from "@/components/general-utility-components/FlexRow.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { Pressable } from "react-native";


export default function Contact({ user, onPress, style={} }) {
	
	return (
		<Pressable onPress={onPress} style={style}>
			{({ pressed }) => (
				<FlexRow>
					<PersonIcon/>
					<Gap horizontal size={12}/>
					<StyledText look={`22 regular ${pressed? "mediumSoft" : "veryHard"}`} hCenter={false} vCenter>
						{user.firstName + " " + user.lastName}
					</StyledText>
				</FlexRow>
			)}
		</Pressable>
	);
	
}