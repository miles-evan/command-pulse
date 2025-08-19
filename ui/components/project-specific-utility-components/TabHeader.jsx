import React from "react";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Image, Pressable } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import ConnectionStatus from "@/components/project-specific-utility-components/ConnectionStatus.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import { Colors } from "@/constants/Colors.js";
import commandPulseText from "@/assets/images/logo.png"
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";


// shows the company name at the top
export default function TabHeader({ widthDivider=false }) {
	
	const { companyName } = useGlobalState();
	
	
	return (
		<Pressable onPress={() => router.push("/account")}>
			<FlexRowSpaceBetween style={{ width: "90%", marginHorizontal: "auto" }}>
				<Image
					source={commandPulseText}
					resizeMode="contain"
					style={{
						width: 55,
						height: 55,
						alignSelf: "center",
						justifyContent: "center",
						marginVertical: "auto"
					}}
				/>
				
				<Gap horizontal size={12}/>
				
				<StyledText
					look="40 medium veryHard"
					numberOfLines={1}
					adjustsFontSizeToFit
					vCenter
					style={{ flexShrink: 1 }}
				>
					{companyName}
				</StyledText>
			</FlexRowSpaceBetween>
			
			<Gap size={5}/>
			
			{/* this is temporary, I'll find a shadow library later */}
			{widthDivider && (<>
				<HorizontalLine length="100%" thickness={0.5} color="mediumSoft" style={{ marginTop: 5, marginBottom: 0 }}/>
				<HorizontalLine length="100%" thickness={0.5} style={{ backgroundColor: Colors.blend("mediumSoft", "soft"), marginVertical: 0 }}/>
				<HorizontalLine length="100%" thickness={0.5} color="soft" style={{ marginVertical: 0 }}/>
				<HorizontalLine length="100%" thickness={0.5} style={{ backgroundColor: Colors.blend("soft", "softer"), marginVertical: 0 }}/>
				<HorizontalLine length="100%" thickness={0.5} color="softer" style={{ marginVertical: 0 }}/>
				<HorizontalLine length="100%" thickness={0.5} style={{ backgroundColor: Colors.blend("softer", "verySoft"), marginVertical: 0 }}/>
				<HorizontalLine length="100%" thickness={0.5} color="verySoft" style={{ marginVertical: 0 }}/>
				<HorizontalLine length="100%" thickness={0.5} style={{ backgroundColor: Colors.blend("verySoft", "white"), marginVertical: 0 }}/>
			</>)}
			
			
			<ConnectionStatus pingInterval={1000}/>
			<Gap size={10}/>
		</Pressable>
	);
	
}