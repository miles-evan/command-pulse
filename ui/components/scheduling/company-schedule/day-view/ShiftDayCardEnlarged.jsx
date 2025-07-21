import { useMemo, useRef, useState } from "react";
import Card from "@/components/project-specific-utility-components/Card.jsx";
import LeftRightSelector from "@/components/project-specific-utility-components/LeftRightSelector.jsx";
import { dayOfWeek } from "@/utils/dateUtils.js";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import { View } from "react-native";
import If from "@/components/general-utility-components/If.jsx";
import AddShiftButton from "@/components/scheduling/company-schedule/day-view/AddShiftButton.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import EditButton from "@/components/project-specific-utility-components/EditButton.jsx";
import ShiftEntryEnlarged from "@/components/scheduling/company-schedule/day-view/ShiftEntryEnlarged.jsx";
import * as shiftService from "@/services/shiftService.js";
import { router } from "expo-router";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";


export default function ShiftDayCardEnlarged({ date, locationName, shifts, onLeft, onRight, leftDisabled, rightDisabled }) {
	
	const sortedShifts = useMemo(() => [...shifts].sort((a, b) => a.startTime.localeCompare(b.startTime)), [shifts]);
	const [editing, setEditing] = useState(false);
	const edits = useRef({});
	const [loadingSubmitEdits, setLoadingSubmitEdits] = useState(false);
	
	const [addingShifts, setAddingShifts] = useState(false);
	const newShifts = useRef([]);
	const [, setNumNewShifts] = useState(0); // just used to rerender when adding new shifts
	const [loadingSubmitNewShifts, setLoadingSubmitNewShifts] = useState(false);
	
	
	function onEdit() {
		setEditing(true);
	}
	
	function cancelEdits() {
		setEditing(false);
		edits.current = {};
	}
	
	async function submitEdits() {
		setLoadingSubmitEdits(true);
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
		setAddingShifts(true);
		setNumNewShifts(prev => prev + 1);
		newShifts.current.push({
			date: date,
			location: locationName,
		});
	}
	
	function cancelAddingShifts() {
		newShifts.current = [];
		setAddingShifts(false);
		setNumNewShifts(0);
	}
	
	async function submitNewShifts() {
		setLoadingSubmitNewShifts(true);
		await Promise.all(
			newShifts.current.map(
				({ date, startTime, endTime, location, payRate, userId }) =>
					shiftService.assignShift(date, startTime, endTime, location, payRate, userId)
			)
		);
		router.back();
	}
	
	
	// --------------------------------
	
	
	return (
		<Card style={{ justifyContent: "flex-start", width: "90%", minHeight: "50%", paddingVertical: 12 }}>
			
			<LeftRightSelector
				onLeft={onLeft}
				onRight={onRight}
				leftDisabled={leftDisabled || editing || addingShifts}
				rightDisabled={rightDisabled || editing || addingShifts}
			>
				{dayOfWeek(date)}
			</LeftRightSelector>
			
			<HorizontalLine color="soft" length={"100%"}/>
			
			<If condition={!loadingSubmitEdits && sortedShifts.length > 0}>
				<EditButton onEdit={onEdit} onDone={submitEdits} onCancel={cancelEdits} withCancelButton disabled={addingShifts}/>
				<Gap size={5}/>
			</If>
			<If condition={loadingSubmitEdits}>
				<StyledText look="18 semibold hard">Loading...</StyledText>
			</If>
			
			{/* Existing shifts */}
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
				
				<If condition={sortedShifts.length > 0}>
					<HorizontalLine color="soft" length={"100%"} style={{ marginTop: 30 }}/>
				</If>
				<If condition={addingShifts}>
					<Gap size={30}/>
				</If>
					
				{/* New shifts */}
				{newShifts.current.map((shift, index) => (
					<ShiftEntryEnlarged
						key={index}
						shift={shift}
						editing
						onChangeEdits={newEdits => {
							newShifts.current[index] = { ...newShifts.current[index], ...newEdits };
						}}
					/>
				))}
				
				<AddShiftButton onPress={addShift} style={{ marginVertical: 15 }}/>
				
				<If condition={addingShifts}>
					<Button onPress={submitNewShifts}>Submit</Button>
					<Button look="white" onPress={cancelAddingShifts}>Cancel</Button>
				</If>
				
			</If>
			
		</Card>
	);
	
}
