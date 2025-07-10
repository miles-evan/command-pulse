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
import { compareDateTimes, getCurrentTimeString, getTodayString } from "@/utils/dateUtils";
import { useEffect, useState } from "react";
import * as shiftService from "@/services/shiftService";


export default function ShiftCard({ shift }) {
	
	const {
		shiftId, firstName, lastName, date, startTime, endTime, location, payRate, clockInTime, clockOutTime
	} = shift;
	
	const [stage, setStage] = useState(0)
	
	
	// compute stage
	useEffect(() => {
		const todayDateString = getTodayString();
		const currentTimeString = getCurrentTimeString();
		
		const minsUntilStartTime = compareDateTimes(date, startTime, todayDateString, currentTimeString) / (1000*60);
		const minsUntilEndTime = compareDateTimes(date, endTime, todayDateString, currentTimeString) / (1000*60);
		
		if(minsUntilStartTime > 30 || minsUntilEndTime < -1440) {
			setStage(0);
		} else if(clockInTime === null && minsUntilStartTime <= 30 && minsUntilEndTime >= 0) {
			setStage(1);
		} else if(clockInTime !== null && clockOutTime === null && minsUntilEndTime > -120) {
			setStage(2);
		} else {
			setStage(3);
		}
	}, []);
	
	
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