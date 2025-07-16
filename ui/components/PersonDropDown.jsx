import * as React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import useContactsList from "@/hooks/useContactsList.js";
import { useMemo } from "react";
import { Colors } from "@/constants/Colors.js";

export default function PersonDropDown({ initialSelectionUserId, placeholder, style }) {
	
	const { contacts, loading } = useContactsList();
	const data = useMemo(() => [...contacts.supervisors, ...contacts.officers].map(person => ({
		label: person.firstName + " " + person.lastName,
		value: person.userId
	})), [contacts]);
	
	return (
		<Dropdown
			style={{
				height: 50, borderColor: Colors.soft, borderWidth: 1, borderRadius: 8,
				paddingHorizontal: 8, ...style
			}}
			maxHeight={300}
			placeholderStyle={{}}
			selectedTextStyle={{}}
			inputSearchStyle={{}}
			iconStyle={{}}
			search
			labelField="label"
			valueField="value"
			data={data}
			value={initialSelectionUserId}
			placeholder={placeholder ?? initialSelectionUserId? "Loading..." : "-- Select Person --"}
			searchPlaceholder="Search..."
			onFocus={() => {}}
			onBlur={() => {}}
			onChange={item => {
				console.log({item})
			}}
		/>
	);
}
