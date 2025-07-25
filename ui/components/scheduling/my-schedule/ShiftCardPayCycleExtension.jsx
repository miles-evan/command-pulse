import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { superShortenTime } from "@/utils/dateUtils.js";
import If from "@/components/general-utility-components/If.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { useState } from "react";
import EditButton from "@/components/project-specific-utility-components/EditButton.jsx";


export default function ShiftCardPayCycleExtension({ shift, isSupervisor }) {
	
	let {
		clockInTime,
		clockOutTime,
		hoursWorked,
		hoursWorkedRevised,
		newHoursWorkedRevised=hoursWorkedRevised
	} = shift;
	
	const [value, setValue] = useState();
	const [revision, setRevision] = useState(null);
	const { revisions, setRevisions, paymentSent } = useGlobalState().context;
	const [revising, setRevising] = useState(false);
	
	
	function onEdit() {
		setRevising(true);
	}
	
	
	function onCancel() {
		setRevising(false);
		setValue("");
	}
	
	
	function onDone() {
		setRevising(false);
		setValue("");
		
		const newRevision = Number(value);
		if(isNaN(newRevision) || value === "" || newRevision === (hoursWorkedRevised ?? hoursWorked)) {
			setRevision(null);
			setRevisions(prev => {
				const { [shift.shiftId]: _, ...rest } = prev;
				return rest;
			});
			return;
		}
		setRevision(newRevision);
		setRevisions(prev => ({ ...prev, [shift.shiftId]: newRevision }));
	}
	
	
	return (
		<>
			<HorizontalLine length="100%" style={{ marginVertical: 10 }}/>
			
			<If condition={isSupervisor && !paymentSent && revising}>
				<EditButton withCancelButton onEdit={onEdit} onDone={onDone} onCancel={onCancel}/>
			</If>
			
			<StyledText look="24 light veryHard" hCenter={false}>
				{"Clock in/out: "
					+ (clockInTime? superShortenTime(clockInTime): "N/A") + "-"
					+ (clockOutTime? superShortenTime(clockOutTime): "N/A")}
			</StyledText>
			
			<StyledText look="24 light veryHard" hCenter={false} style={{ marginTop: -3 }}>
				{`Hours registered: ${!isSupervisor && newHoursWorkedRevised !== null? newHoursWorkedRevised : hoursWorked}hrs`}
			</StyledText>
			
			<If condition={isSupervisor && (hoursWorkedRevised !== null || revision !== null)}>
				<StyledText look="24 light altAccent veryHard" hCenter={false} style={{ marginTop: -3 }}>
					{`Revised: ${revision === null? hoursWorkedRevised : revision}hrs`}
				</StyledText>
			</If>
			
			<If condition={isSupervisor && !paymentSent && revising}>
				<StyledTextInput
					keyboardType="numeric"
					placeholder="Revise hours"
					onChangeText={setValue}
					value={value}
					color="altAccent"
					style={{ fontSize: 24, textAlign: undefined }}
				/>
			</If>
		
		</>
	);
	
}