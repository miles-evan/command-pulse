import { useMemo, useRef, useState } from "react";
import Card from "@/components/project-specific-utility-components/Card.jsx";
import LeftRightSelector from "@/components/project-specific-utility-components/LeftRightSelector.jsx";
import { dayOfWeek } from "@/utils/dateUtils.js";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import { View } from "react-native";
import If from "@/components/general-utility-components/If.jsx";
import AddShiftButton from "@/components/scheduling/company-schedule/AddShiftButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import EditButton from "@/components/project-specific-utility-components/EditButton.jsx";
import ShiftEntryEnlarged from "@/components/scheduling/company-schedule/ShiftEntryEnlarged.jsx";
import * as shiftService from "@/services/shiftService.js";


export default function ShiftDayCardEnlarged({ date, shifts, onLeft, onRight, leftDisabled, rightDisabled }) {
	
	const sortedShifts = useMemo(() => [...shifts].sort((a, b) => a.startTime.localeCompare(b.startTime)), [shifts]);
	const [editing, setEditing] = useState(false);
	const edits = useRef({})
	
	
	function onEdit() {
		setEditing(true);
	}
	
	
	function onCancel() {
		setEditing(false);
		edits.current = {};
	}
	
	
	function onDone() {
		setEditing(false);
		// make request
		shiftService.updateShifts();
	}
	
	
	return (
		<Card style={{ justifyContent: "flex-start", width: "90%", minHeight: "50%", paddingVertical: 12 }}>
			
			<LeftRightSelector
				onLeft={onLeft}
				onRight={onRight}
				leftDisabled={leftDisabled || editing}
				rightDisabled={rightDisabled || editing}
			>
				{dayOfWeek(date)}
			</LeftRightSelector>
			
			<HorizontalLine color="soft" length={"100%"}/>
			
			<EditButton onEdit={onEdit} onDone={onDone} onCancel={onCancel} withCancelButton/>
			<Gap size={5}/>
			
			{sortedShifts.map((shift, index) => (
				<View key={index}>
					<ShiftEntryEnlarged
						shift={shift}
						editing={editing}
						onChangeEdits={newEdits => {
							if(Object.keys(newEdits).length === 0) delete edits.current[shift.id];
							else edits.current[shift.id] = newEdits;
						}}
					/>
					
					<If condition={!editing && index < sortedShifts.length - 1}>
						<HorizontalLine color="softer"/>
					</If>
				</View>
			))}
			
			<If condition={!editing}>
				<AddShiftButton/>
			</If>
			
		</Card>
	);
	
}
