import { useGlobalState } from "@/hooks/useGlobalState.js";
import * as companyService from "@/services/companyService.ts";
import { useEffect, useState } from "react";


export default function useContactsList() {
	
	const globalState = useGlobalState();
	const [loading, setLoading] = useState(true);
	const [contacts, setContacts] = useState(globalState.contacts ?? { supervisors: [], officers: [] });
	
	
	useEffect(() => {
		if("contacts" in globalState) {
			setContacts(globalState.contacts);
			setLoading(false);
		} else {
			fetchContacts();
		}
	});

	
	async function fetchContacts() {
		setLoading(true);
		const contacts = (await companyService.getContacts()).body;
		globalState.contacts = contacts;
		setContacts(contacts)
		setLoading(false);
	}
	
	
	return { contacts, loading, refetch: fetchContacts };
	
}