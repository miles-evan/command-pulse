import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import StyledDropdown from "@/components/project-specific-utility-components/StyledDropdown.jsx";
import * as React from "react";


export default function Create() {
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<BackButton/>
			
			<StyledText
				look="22 medium mediumHard"
				hCenter={false}
				style={{ width: "90%", marginHorizontal: "auto", marginTop: 20 }}
			>
				Shift when the incident took place
			</StyledText>
			
			
		
		</SafeAreaViewWithBackground>
	);
	
}