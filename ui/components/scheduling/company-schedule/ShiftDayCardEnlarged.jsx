import {useMemo, useState} from "react";
import Card from "@/components/Card.jsx";
import LeftRightSelector from "@/components/LeftRightSelector.jsx";
import {dayOfWeek, superShortenTime} from "@/utils/dateUtils.js";
import HorizontalLine from "@/components/utility-components/HorizontalLine.jsx";
import FlexRowSpaceBetween from "@/components/utility-components/FlexRowSpaceBetween.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { StyleSheet, View } from "react-native";
import If from "@/components/utility-components/If.jsx";
import AddShiftButton from "@/components/scheduling/company-schedule/AddShiftButton.jsx";
import Gap from "@/components/utility-components/Gap.jsx";
import EditButton from "@/components/EditButton.jsx";
import ShiftEntryEnlarged from "@/components/scheduling/company-schedule/ShiftEntryEnlarged.jsx";


export default function ShiftDayCardEnlarged({ date, shifts, onLeft, onRight }) {
	
	const sortedShifts = useMemo(() => [...shifts].sort((a, b) => a.startTime.localeCompare(b.startTime)), [shifts]);
	const [editing, setEditing] = useState(false);
	
	
	function onEdit() {
		setEditing(true);
	}
	
	
	function onDone() {
		setEditing(false);
		// send requests
	}
	
	
	return (
		<Card style={{ justifyContent: "flex-start", width: "90%", minHeight: "50%", paddingVertical: 12 }}>
			
			<LeftRightSelector onLeft={onLeft} onRight={onRight}>{dayOfWeek(date)}</LeftRightSelector>
			<HorizontalLine color="soft" length={"100%"}/>
			<EditButton onEdit={onEdit} onDone={onDone} onCancel={() => setEditing(false)} withCancelButton/>
			<Gap size={5}/>
			
			{sortedShifts.map((shift, index) => (
				<View key={index}>
					<ShiftEntryEnlarged shift={shift} editing={editing}/>
					
					<If condition={!editing && index < sortedShifts.length - 1}>
						<HorizontalLine color="softer"/>
					</If>
				</View>
			))}
			
			<If condition={editing}>
				<Gap size={15}/>
				<AddShiftButton/>
				<Gap size={15}/>
			</If>
			
		</Card>
	);
	
}
