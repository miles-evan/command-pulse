import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";
import { View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router"


export default function IncidentReports() {
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader/>
			<View style={{ width: "90%", marginHorizontal: "auto" }}>
				<StyledText look="26 medium mediumHard" hCenter={false}>Incident reports</StyledText>
				<IconAndTextButton
					iconName="add-circle-outline"
					text="  Create new report"
					size={36}
					fontSize={24}
					onPress={() => router.push("/(tabs)/incident-reports/create")}
					outerContainerStyle={{ alignItems: undefined }}
					innerContainerStyle={{ marginTop: 20, flexDirection: "row", justifyContent: "flex-start" }}
					styledTextPropsObj={{ hCenter: false }}
				/>
				<IconAndTextButton
					IconFamily={MaterialCommunityIcons}
					iconName="file-search-outline"
					text="  View or edit previous reports"
					size={36}
					fontSize={24}
					onPress={() => router.push("/(tabs)/incident-reports/see-incidents")}
					outerContainerStyle={{ alignItems: undefined }}
					innerContainerStyle={{ marginTop: 20, flexDirection: "row" }}
					styledTextPropsObj={{ hCenter: false }}
				/>
			</View>
		</SafeAreaViewWithBackground>
	);
}