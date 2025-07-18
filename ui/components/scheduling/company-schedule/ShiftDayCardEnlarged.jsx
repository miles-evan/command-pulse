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
import { router } from "expo-router";
import StyledText from "@/components/general-utility-components/StyledText.jsx";


export default function ShiftDayCardEnlarged({ date, shifts, onLeft, onRight, leftDisabled, rightDisabled }) {
	
	const sortedShifts = useMemo(() => [...shifts].sort((a, b) => a.startTime.localeCompare(b.startTime)), [shifts]);
	const [editing, setEditing] = useState(false);
	const edits = useRef({});
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [addingShifts, setAddingShifts] = useState(false);
	const [newShifts, setNewShifts] = useState([]);
	
	
	function onEdit() {
		setEditing(true);
	}
	
	function cancelEdits() {
		setEditing(false);
		edits.current = {};
	}
	
	async function submitEdits() {
		setLoadingSubmit(true);
		await Promise.all(
			Object.keys(edits.current).map(
				shiftId => {
					const { reassignedUserId, ...updatedInfo } = edits.current[shiftId];
					const responses = [shiftService.updateShifts([shiftId], updatedInfo)];
					if(reassignedUserId)
						responses.push(shiftService.reassignShift(shiftId, reassignedUserId));
					return Promise.all(responses);
				}
			)
		);
		router.back();
	}
	
	
	function addShift() {
		setEditing(true);
		setNewShifts(prev => [...prev, {
			userId: null,
			payRate: null,
			startTime: null,
			endTime: null
		}]);
	}
	
	
	// --------------------------------
	
	
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
			
			<If condition={!loadingSubmit}>
				<EditButton onEdit={onEdit} onDone={submitEdits} onCancel={cancelEdits} withCancelButton disabled={addingShifts}/>
				<Gap size={5}/>
			</If>
			<If condition={loadingSubmit}>
				<StyledText look="18 semibold hard">Loading...</StyledText>
			</If>
			
			{sortedShifts.map((shift, index) => (
				<View key={index}>
					<ShiftEntryEnlarged
						shift={shift}
						editing={editing}
						onChangeEdits={newEdits => {
							if(Object.keys(newEdits).length === 0) delete edits.current[shift.shiftId];
							else edits.current[shift.shiftId] = newEdits;
						}}
					/>
					
					<If condition={!editing && index < sortedShifts.length - 1}>
						<HorizontalLine color="softer"/>
					</If>
				</View>
			))}
			
			<If condition={!editing}>
				<Gap size={20}/>
				<HorizontalLine color="soft" length={"100%"}/>
				<Gap size={15}/>
				<AddShiftButton onPress={addShift}/>
				<Gap size={15}/>
			</If>
			
		</Card>
	);
	
}
