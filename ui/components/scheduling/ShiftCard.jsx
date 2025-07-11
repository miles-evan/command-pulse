import Card from "@/components/Card";
import DateAndTime from "@/components/scheduling/DateAndTime";
import Gap from "@/components/Gap";
import HorizontalLine from "@/components/HorizontalLine";
import LocationAndPayRate from "@/components/scheduling/LocationAndPayRate";
import If from "@/components/If";
import ClockInButton from "@/components/scheduling/ClockInButton";
import ClockOutButton from "@/components/scheduling/ClockOutButton";
import IncidentButton from "@/components/scheduling/IncidentButton";
import FlexRowSpaceAround from "@/components/FlexRowSpaceAround";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import * as shiftService from "@/services/shiftService";
import { computeShiftStage } from "@/components/scheduling/computeShiftStage";


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
			...(stage === 3 && { borderColor: Colors.hard }),
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