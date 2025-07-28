import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";
import { router } from "expo-router";


export default function InviteUserButton() {
	
	function gotoInvitePage() {
		router.push("/invite-users");
	}
	
	
	return (
		<IconAndTextButton
			iconName="add"
			text="Invite new user"
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