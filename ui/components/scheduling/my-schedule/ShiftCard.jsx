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
import ShiftCardPayCycleExtension from "@/components/scheduling/my-schedule/ShiftCardPayCycleExtension.jsx";
import { Pressable } from "react-native";
import { router } from "expo-router";


// Modes:
// default mode shows the shifts like when you're viewing your schedule, lets you clock in and out
// pay cycle modes ("pay cycle supervisor" and "pay cycle officer") show information like registered and revised hours
// plain mode ("plain") just makes sure there's no buttons
// header and footer are to add components to the top and bottom of the card if you need to
export default function ShiftCard({
	shift,
	mode="default",
	HeaderComponent,
	FooterComponent,
	onPress,
	showPressFeedback=false,
	style={},
}) {
	
	const {
		shiftId, firstName, lastName, shiftStart, shiftEnd, location, payRate, clockInTime, clockOutTime
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
	
	
	function makeIncidentReport() {
		router.push({
			pathname: "/(tabs)/incident-reports/create",
			params: { shiftId },
		});
	}
	
	
	return (
		<Card
			onPress={onPress}
			showPressFeedback={showPressFeedback}
			style={{
				paddingHorizontal: 25,
				marginTop: 0,
				...(mode === "default" && {
					...(stage > 0 && { borderColor: Colors.accent }),
					...(stage === 3 && { borderColor: Colors.mediumHard }),
				}),
				...style
			}}
		>
			{HeaderComponent}
			
			<DateAndTime shiftStart={shiftStart} shiftEnd={shiftEnd}/>
			<Gap size={5}/>
			<LocationAndPayRate location={location} payRate={payRate}/>
			
			{mode === "default"? (
				
				<If condition={stage > 0}>
					<HorizontalLine length="100%" style={{ marginTop: 5, marginBottom: 15 }}/>
					<FlexRowSpaceAround>
						{stage === 1? (
							<ClockInButton onPress={clockIn}/>
						) : stage === 2? (<>
							<IncidentButton onPress={makeIncidentReport}/>
							<ClockOutButton onPress={ clockOut }/>
						</>) : stage === 3? (
							<IncidentButton onPress={makeIncidentReport}/>
						) : null}
					</FlexRowSpaceAround>
				</If>
			
			) : mode === "pay cycle supervisor"? (
				<ShiftCardPayCycleExtension shift={shift} isSupervisor={true}/>
			) : mode === "pay cycle officer"? (
				<ShiftCardPayCycleExtension shift={shift} isSupervisor={false}/>
			) : null}
			
			{FooterComponent}
		</Card>
	);
	
}