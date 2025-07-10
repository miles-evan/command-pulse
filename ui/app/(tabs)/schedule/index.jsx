import TabHeader from "@/components/TabHeader";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import { FlatList, View } from "react-native";
import ShiftCard from "@/components/scheduling/ShiftCard";
import { useEffect, useState } from "react";
import * as shiftService from "@/services/shiftService";
import { getToday } from "@/utils/getToday";


export default function Schedule() {
	
	// const shift = {
	// 	shiftId: null,
	// 	firstName: null,
	// 	lastName: null,
	// 	date: "2025-07-09",
	// 	startTime: "2:30 PM",
	// 	endTime: "5:00 PM",
	// 	location: "Elwood business park",
	// 	payRate: 25,
	// 	clockInTime: null,
	// 	clockOutTime: null
	// };
	//
	// const shifts = [shift, shift, shift, shift, shift];
	
	const [shifts, setShifts] = useState([]);
	
	useEffect(() => {
		getShifts();
	}, []);
	
	
	async function getShifts() {
		console.log(getToday());
		const response = await shiftService.getMy(getToday(), 1, 0, 100);
		const { shifts } = response.body;
		setShifts(shifts);
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<TabHeader />
			<View style={{ flex: 1 }}>
				<FlatList
					data={shifts}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item: shift }) => <ShiftCard shift={shift} />}
					keyboardDismissMode="on-drag"
				/>
			</View>
		</SafeAreaViewWithBackground>
	
	);
}