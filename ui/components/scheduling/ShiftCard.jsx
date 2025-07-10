import Card from "@/components/Card";
import DateAndTime from "@/components/scheduling/DateAndTime";
import StyledText from "@/components/StyledText";
import Gap from "@/components/Gap";
import HorizontalLine from "@/components/HorizontalLine";
import FlexRowSpaceBetween from "@/components/FlexRowSpaceBetween";
import LocationAndPayRate from "@/components/scheduling/LocationAndPayRate";


export default function ShiftCard({ shift }) {
	
	const {
		shiftId, firstName, lastName, date, startTime, endTime, location, payRate, clockInTime, clockOutTime
	} = shift;
	
	
	return (
		<Card style={{ paddingHorizontal: 25 }}>
			<DateAndTime date={date} startTime={startTime} endTime={endTime}/>
			<Gap size={5}/>
			<LocationAndPayRate location={location} payRate={payRate}/>
		</Card>
	);
	
}