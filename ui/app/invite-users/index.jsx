import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Colors } from "@/constants/Colors.js";
import { Dropdown } from "react-native-element-dropdown";
import * as React from "react";
import { useState } from "react";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import useInviteCodes from "@/hooks/useInviteCodes.js";
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import OrLine from "@/components/general-utility-components/OrLine.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import CopyButton from "@/components/project-specific-utility-components/CopyButton.jsx";
import StyledDropdown from "@/components/project-specific-utility-components/StyledDropdown.jsx";


export default function InviteUsers() {
	
	const [invitingWho, setInvitingWho] = useState("officer");
	const { inviteCodes, loading, reset, loadingReset } = useInviteCodes();
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			<BackButton/>
			
			<View style={{ width: "90%", marginHorizontal: "auto" }}>
				
				<Gap size={10}/>
				<StyledText look="32 medium mediumHard" hCenter={false}>Invite new user</StyledText>
				
				<Gap size={10}/>
				<StyledDropdown
					data={[
						{ label: "Invite as officer", value: "officer" },
						{ label: "Invite as supervisor", value: "supervisor" }
					]}
					value={invitingWho}
					onChange={({ value }) => setInvitingWho(value)}
				/>
				
				<Gap size={25}/>
				<HorizontalLine length={"100%"} color="soft"/>
				
				<Gap size={10}/>
				<StyledText look="32 medium mediumHard" hCenter={false}>Invite link</StyledText>
				{!(loading || loadingReset)? (
					<StyledText look="16 light medium" hCenter={false}>Feature coming soon</StyledText>
				) : (
					<LoadingText hCenter={false}/>
				)}
				
				<Gap size={10}/>
				<OrLine length="100%"/>
				
				<Gap size={10}/>
				<StyledText look="32 medium mediumHard" hCenter={false}>Invite code</StyledText>
				{!(loading || loadingReset)? (
					<FlexRowSpaceBetween style={{ alignItems: "center" }}>
						<StyledText look="22 light medium" hCenter={false}>{inviteCodes[invitingWho]}</StyledText>
						<CopyButton textToCopy={inviteCodes[invitingWho]}/>
					</FlexRowSpaceBetween>
				) : (
					<LoadingText hCenter={false}/>
				)}
				
				<Gap size={12}/>
				<Button look="graySmall" onPress={reset} disabled={loadingReset}>Reset codes</Button>
				
			</View>
			
		</SafeAreaViewWithBackground>
	);
	
}