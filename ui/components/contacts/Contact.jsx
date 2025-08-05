import PersonIcon from "@/components/contacts/PersonIcon.jsx";
import FlexRow from "@/components/general-utility-components/FlexRow.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { Pressable } from "react-native";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";


export default function Contact({ user: { firstName, lastName }, onPress, style={}, iconAfterContact }) {
	
	return (
		<Pressable onPress={onPress} style={style}>
			{({ pressed }) => (
				<FlexRowSpaceBetween>
					
					<FlexRow>
						<PersonIcon/>
						<Gap horizontal size={12}/>
						<StyledText look={`22 regular ${pressed? "mediumSoft" : "veryHard"}`} hCenter={false} vCenter>
							{firstName + " " + lastName}
						</StyledText>
					</FlexRow>
					
					{iconAfterContact}
					
				</FlexRowSpaceBetween>
				
			)}
		</Pressable>
	);
	
}