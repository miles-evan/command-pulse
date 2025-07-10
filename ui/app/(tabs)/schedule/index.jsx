import TabHeader from "@/components/TabHeader";
import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import { FlatList, View } from "react-native";
import ShiftCard from "@/components/scheduling/ShiftCard";
import { useEffect, useState } from "react";
import * as shiftService from "@/services/shiftService";
import { getToday } from "@/utils/dateUtils";
import StyledText from "@/components/StyledText";
import FlexRowSpaceBetween from "@/components/FlexRowSpaceBetween";


export default function Schedule() {
	
	const [shifts, setShifts] = useState([]);


	useEffect(() => {
		getShifts();
	}, []);
	
	
	async function getShifts() {
		const response = await shiftService.getMy(getToday(), 1, 0, 100);
		const { shifts } = response.body;
		setShifts(shifts);
	}
	
	
	return (
		<SafeAreaViewWithBackground>

			<TabHeader />

			<FlexRowSpaceBetween>
				<StyledText look="16 medium medium">Upcoming shifts:</StyledText>
				<StyledText look="16 medium accent">See past shifts</StyledText>
			</FlexRowSpaceBetween>

			<FlatList
				data={shifts}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item: shift }) => <ShiftCard shift={shift} />}
				keyboardDismissMode="on-drag"
			/>

		</SafeAreaViewWithBackground>
	
	);
}