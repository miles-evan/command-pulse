import { View } from "react-native";


export default function FlexRowSpaceBetween({ style, children }) {
	
	return (
		<View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", ...style }}>
			{children}
		</View>
	);
	
}