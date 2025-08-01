import * as React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import useContactsList from "@/hooks/useContactsList.js";
import { useMemo, useState } from "react";
import { Colors } from "@/constants/Colors.js";

export default function PersonDropDown({ initialSelectionUserId, placeholder, onNewValue=_=>{}, style, ...rest }) {
	
	const { contacts, loading } = useContactsList();
	const data = useMemo(() => [...contacts.supervisors, ...contacts.officers].map(person => ({
		label: person.firstName + " " + person.lastName,
		value: person.userId
	})), [contacts]);
	const [isDifferent, setIsDifferent] = useState(false);
	
	
	return (
		<Dropdown
			style={{
				height: 50,
				borderColor: Colors.soft,
				borderWidth: 1,
				borderRadius: 8,
				paddingHorizontal: 8,
				...style
			}}
			maxHeight={300}
			placeholderStyle={{}}
			selectedTextStyle={{ color: isDifferent? Colors.altAccent : Colors.veryHard }}
			inputSearchStyle={{}}
			iconStyle={{}}
			search
			labelField="label"
			valueField="value"
			data={data}
			value={initialSelectionUserId}
			placeholder={initialSelectionUserId? "Loading..." : "Select Person"}
			searchPlaceholder="Search..."
			onFocus={() => {}}
			onBlur={() => {}}
			onChange={({ value }) => {
				setIsDifferent(value !== initialSelectionUserId);
				onNewValue(value);
			}}
			{...rest}
		/>
	);
}
