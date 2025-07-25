import ContactsList from "@/components/contacts/ContactsList.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";


export default function PayCycleContactsList() {
	
	const globalState = useGlobalState();
	
	
	function onPressContact(user) {
		globalState.params = { user };
		router.push("/(tabs)/pay-cycles/see-pay-cycles");
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			<Gap size={16}/>
			
			<ContactsList onPressContact={onPressContact}/>
			
		</SafeAreaViewWithBackground>
	);
	
}
