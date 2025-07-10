import { View } from "react-native";


export default function FlexRowSpaceAround({ style, children }) {
	
	return (
		<View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", ...style }}>
			{children}
		</View>
	);
	
}