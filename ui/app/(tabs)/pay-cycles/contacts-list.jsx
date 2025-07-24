import ContactsList from "@/components/contacts/ContactsList.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { router } from "expo-router";


export default function PayCycleContactsList() {
	
	function onPressContact(user) {
		router.push({
			pathname: "/(tabs)/pay-cycles/see-pay-cycles",
			params: { ...user },
		});
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			<Gap size={16}/>
			
			<ContactsList onPressContact={onPressContact}/>
			
		</SafeAreaViewWithBackground>
	);
	
}
