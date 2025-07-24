import { ScrollView } from "react-native";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import useContactsList from "@/hooks/useContactsList.js";
import Contact from "@/components/contacts/Contact.jsx";


export default function ContactsList({ onPressContact =_=>{} }) {
	
	const { contacts: { supervisors, officers }, loading } = useContactsList();
	
	
	const formatUsers = users => users.map(user => <Contact key={user.userId} user={user} onPress={() => onPressContact(user)}/>);
	
	
	return (
		<ScrollView style={{ width: "90%", marginHorizontal: "auto" }}>
			
			<StyledText look="16 light accent" hCenter={false}>Supervisors</StyledText>
			{formatUsers(supervisors)}
			
			<HorizontalLine style={{ width: "100%" }}/>
			
			<StyledText look="16 light accent" hCenter={false}>Officers</StyledText>
			{formatUsers(officers)}
			
		</ScrollView>
	);
	
}