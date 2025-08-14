import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function RemoveUserButton() {
	
	function gotoInvitePage() {
		router.push("/remove-users");
	}
	
	
	return (
		<IconAndTextButton
			iconName="remove"
			IconFamily={Ionicons}
			text="Remove new user"
			color="mediumSoft"
			pressColor="medium"
			innerContainerStyle={{ flexDirection: "row" }}
			outerContainerStyle={{ flexDirection: "row", justifyContent: "flexStart" }}
			textStyle={{ marginLeft: 12 }}
			fontSize="22"
			fontWeight="regular"
			size={36}
			onPress={gotoInvitePage}
		/>
	);
	
}