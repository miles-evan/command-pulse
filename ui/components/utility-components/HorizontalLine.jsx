import { View } from "react-native";
import {Colors} from "@/constants/Colors.js";


export default function HorizontalLine({ length="90%", thickness=1, color="medium", style }) {
	
	return (
		<View style={{
			width: length,
			height: thickness,
			backgroundColor: Colors[color],
			marginHorizontal: "auto",
			marginVertical: 10,
			...style
		}}/>
	);
	
}