import { View } from "react-native";


export default function FlexRow({ style, children }) {
	
	return (
		<View style={{ flexDirection: "row", ...style }}>
			{children}
		</View>
	);
	
}