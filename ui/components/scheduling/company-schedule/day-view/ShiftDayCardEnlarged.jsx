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
import LoadingText from "@/components/project-specific-utility-components/LoadingText.jsx";


export default function ShiftDayCardEnlarged({ date, locationName, shifts, onLeft, onRight, leftDisabled, rightDisabled }) {
	
	const [deletedIndices, setDeletedIndices] = useState(new Set());
	
	const sortedShifts = useMemo(() => [...shifts].sort((a, b) => a.shiftStart - b.shiftStart), [shifts]);
	const [editing, setEditing] = useState(false);
	const edits = useRef({});
	const [loadingSubmitEdits, setLoadingSubmitEdits] = useState(false);
	
	const [addingShifts, setAddingShifts] = useState(false);
	const newShifts = useRef([]);
	const [numNewShifts, setNumNewShifts] = useState(0);
	const [newShiftsNextKey, setNewShiftsNextKey] = useState(0);
	const [loadingSubmitNewShifts, setLoadingSubmitNewShifts] = useState(false);
	
	
	// --------------------------------
	
	
	function onEdit() {
		setEditing(true);
	}
	
	function cancelEdits() {
		setEditing(false);
		edits.current = {};
		setDeletedIndices(new Set());
	}
	
	async function submitEdits() {
		setLoadingSubmitEdits(true);
		await Promise.all([
			...Object.keys(edits.current).map(
				shiftId => {
					const { userId: reassignedUserId, ...updatedInfo } = edits.current[shiftId];
					const responses = [];
					if(Object.keys(updatedInfo).length > 0)
						responses.push(shiftService.updateShifts([shiftId], updatedInfo));
					if(reassignedUserId)
						responses.push(shiftService.reassignShift(shiftId, reassignedUserId));
					return Promise.all(responses);
				}
			),
			[...deletedIndices].length > 0?
				shiftService.deleteShifts([...deletedIndices].map(index => sortedShifts[index].shiftId))
				: null
		]);
		router.back();
	}
	
	
	// --------------------------------
	
	
	function addShift() {
		setAddingShifts(true);
		setNumNewShifts(prev => prev + 1);
		newShifts.current.push({
			date: date,
			location: locationName,
			key: newShiftsNextKey,
		});
		setNewShiftsNextKey(prev => prev + 1);
	}
	
	function deleteNewShift(index) {
		if(numNewShifts === 1)
			setAddingShifts(false);
		newShifts.current.splice(index, 1);
		setNumNewShifts(prev => prev - 1);
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
					shiftService.assignShift(shiftStart, shiftEnd, location, payRate, userId)
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
				<LoadingText/>
			</If>
			
			{/* Existing shifts */}
			{sortedShifts.map((shift, index) => (
				<If condition={!deletedIndices.has(index)} key={shift.shiftId}>
						<ShiftEntryEnlarged
							shift={shift}
							editing={editing}
							onChangeEdits={newEdits => {
								if(Object.keys(newEdits).length === 0) delete edits.current[shift.shiftId];
								else edits.current[shift.shiftId] = newEdits;
							}}
							onDelete={() => setDeletedIndices(prev => new Set([...prev, index]))}
						/>
						
						<If condition={!editing && index < sortedShifts.length - 1}>
							<HorizontalLine color="softer"/>
						</If>
				</If>
			))}
			
			<If condition={!editing}>
				
				<If condition={addingShifts && sortedShifts.length > 0}>
					<HorizontalLine color="soft" length={"100%"} style={{ marginTop: 30 }}/>
				</If>
				<If condition={addingShifts}>
					<Gap size={20}/>
				</If>
				<Gap size={10}/>
				
				<If condition={loadingSubmitNewShifts}>
					<LoadingText/>
				</If>
					
				{/* New shifts */}
				{newShifts.current.map((shift, index) => (
					<ShiftEntryEnlarged
						key={shift.key}
						shift={shift}
						editing
						onChangeEdits={newEdits => {
							newShifts.current[index] = { ...newShifts.current[index], ...newEdits };
						}}
						onDelete={() => deleteNewShift(index)}
					/>
				))}
				
				<If condition={!loadingSubmitNewShifts}>
					<AddShiftButton onPress={addShift} style={{ marginVertical: 15 }}/>
					
					<If condition={addingShifts}>
						<Button onPress={submitNewShifts} disabled={loadingSubmitNewShifts}>Submit</Button>
						<Button look="white" onPress={cancelAddingShifts} disabled={loadingSubmitNewShifts}>Cancel</Button>
					</If>
				</If>
				
			</If>
			
		</Card>
	);
	
}
