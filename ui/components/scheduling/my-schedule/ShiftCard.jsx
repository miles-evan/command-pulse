import Card from "@/components/project-specific-utility-components/Card.jsx";
import DateAndTime from "@/components/scheduling/my-schedule/DateAndTime.jsx";
import Gap from "@/components/general-utility-components/Gap.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import LocationAndPayRate from "@/components/scheduling/my-schedule/LocationAndPayRate.jsx";
import If from "@/components/general-utility-components/If.jsx";
import ClockInButton from "@/components/scheduling/my-schedule/ClockInButton.jsx";
import ClockOutButton from "@/components/scheduling/my-schedule/ClockOutButton.jsx";
import IncidentButton from "@/components/scheduling/my-schedule/IncidentButton.jsx";
import FlexRowSpaceAround from "@/components/general-utility-components/FlexRowSpaceAround.jsx";
import { Colors } from "@/constants/Colors.js";
import { useEffect, useState } from "react";
import * as shiftService from "@/services/shiftService.js";
import { computeShiftStage } from "@/components/scheduling/my-schedule/computeShiftStage.js";


export default function ShiftCard({ shift }) {
	
	const {
		shiftId, firstName, lastName, date, startTime, endTime, location, payRate, clockInTime, clockOutTime
	} = shift;
	
	const [stage, setStage] = useState(0)
	
	
	useEffect(() => {
		setStage(computeShiftStage(shift))
	}, [shift]);
	
	
	async function clockIn() {
		setStage(2);
		await shiftService.clockIn(shiftId);
	}
	
	
	async function clockOut() {
		setStage(3);
		await shiftService.clockOut(shiftId);
	}
	
	
	return (
		<Card style={{
			paddingHorizontal: 25,
			marginTop: 0,
			...(stage > 0 && { borderColor: Colors.accent }),
			...(stage === 3 && { borderColor: Colors.mediumHard }),
		}}>
			
			<DateAndTime date={date} startTime={startTime} endTime={endTime}/>
			<Gap size={5}/>
			<LocationAndPayRate location={location} payRate={payRate}/>
			
			<If condition={stage > 0}>
				
				<Gap size={5}/>
				<HorizontalLine length="100%"/>
				<Gap size={5}/>
				
				<FlexRowSpaceAround>
					<If condition={stage === 1}>
						<ClockInButton onPress={clockIn}/>
					</If>
					<If condition={stage === 2}>
						<IncidentButton/>
						<ClockOutButton onPress={clockOut}/>
					</If>
					<If condition={stage === 3}>
						<IncidentButton/>
					</If>
				</FlexRowSpaceAround>
				
			</If>
			
		</Card>
	);
	
}