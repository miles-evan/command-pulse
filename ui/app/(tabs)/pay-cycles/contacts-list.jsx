import ContactsList from "@/components/contacts/ContactsList.jsx";
import SafeAreaViewWithBackground
	from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import TabHeader from "@/components/project-specific-utility-components/TabHeader.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { router } from "expo-router";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { useEffect, useMemo, useState } from "react";
import useContactsList from "@/hooks/useContactsList.js";
import { getPayCycleRange } from "@/utils/dateUtils.js";
import * as payCycleService from "@/services/payCycleService.js";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";
import { useIsScreenFocused } from "@/hooks/useIsScreenFocused.js";


export default function PayCycleContactsList() {
	
	const globalState = useGlobalState();
	const { contacts, loading: loadingContacts } = useContactsList();
	const flatContacts = useMemo(() => [...contacts.supervisors, ...contacts.officers], [contacts])
	const [currentPayCycles, setCurrentPayCycles] = useState({});
	const isScreenFocused = useIsScreenFocused();
	
	
	useEffect(() => {
		if(loadingContacts || !isScreenFocused) return;
		
		const dateRange = getPayCycleRange().dateRange;
		flatContacts.forEach(async user => {
			const payCycleSummary =
				(await payCycleService.getSummary(user.userId, ...dateRange)).body;
			setCurrentPayCycles(prev => ({ ...prev, [user.userId]: payCycleSummary }));
		});
	}, [loadingContacts, isScreenFocused]);
	
	
	function onPressContact(user) {
		globalState.params = { user, currentPayCycles };
		router.push("/(tabs)/pay-cycles/see-pay-cycles");
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<TabHeader/>
			<Gap size={16}/>
			
			<ContactsList
				onPressContact={onPressContact}
				iconAfterContact={user => (
					currentPayCycles[user.userId]?.payCycle?.paymentSent?
						<MaterialIcons name="check" size={32} color={Colors.accent} style={{ marginVertical: "auto" }}/>
						: null
				)}
			/>
			
		</SafeAreaViewWithBackground>
	);
	
}
