import background from "@/assets/images/squares-background.png";
import { View, Image, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const { width } = Dimensions.get("window");


export default function SafeAreaViewWithBackground({ children }) {
	const insets = useSafeAreaInsets();
	
	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
		
			<StatusBar style="dark" />

			<Image source={background} resizeMode="cover" style={{
				position: "absolute", bottom: 0, width: width, height: undefined, aspectRatio: 598/984
			}}/>

			<View style={{ flex: 1, paddingTop: insets.top }}>
				{children}
			</View>
		
		</View>
	);
	
	
}