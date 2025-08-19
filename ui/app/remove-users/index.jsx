import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import * as React from "react";
import PersonDropDown from "@/components/scheduling/company-schedule/day-view/PersonDropDown.jsx";
import { useState } from "react";
import * as companyService from "@/services/companyService.js";
import useContactsList from "@/hooks/useContactsList.js";
import { Colors } from "@/constants/Colors.js";
import { router } from "expo-router";

export default function RemoveUsers() {
	
	const [userIdToRemove, setUserIdToRemove] = useState(null);
	const [loading, setLoading] = useState(false);
	const { refetch } = useContactsList();
	
	
	async function removeUser() {
		setLoading(true);
		if(userIdToRemove) {
			await companyService.removeUser(userIdToRemove);
			await refetch();
		}
		setLoading(false);
		
		router.back();
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			<BackButton/>
			
			<View style={{ width: "90%", marginHorizontal: "auto" }}>
				
				<Gap size={10}/>
				<StyledText look="32 medium mediumHard" hCenter={false}>Remove user from company</StyledText>
				
				<Gap size={10}/>
				<PersonDropDown onNewValue={setUserIdToRemove}/>
				
				<Gap size={10}/>
				<Button look="danger" disabled={loading} onPress={removeUser}>
					Remove user
				</Button>
			
			</View>
		
		</SafeAreaViewWithBackground>
	);
	
}