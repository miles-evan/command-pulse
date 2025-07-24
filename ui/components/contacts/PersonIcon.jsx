import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View } from "react-native";
import { Colors } from "@/constants/Colors.js";


export default function PersonIcon() {
	
	return (
		<View style={{
			width: 36,
			height: 36,
			borderRadius: 18,
			backgroundColor: Colors.soft,
			justifyContent: "center",
			alignItems: "center",
			marginVertical: 8,
		}}>
			<MaterialIcons name="person-outline" size={26} color={Colors.hard} />
		</View>
	);
	
}