import background from "@/assets/images/squares-background.png";
import {View, Image, Dimensions, Keyboard, TouchableWithoutFeedback} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WrapChildrenIf from "@/components/WrapChildrenIf.jsx";


const { width } = Dimensions.get("window");


export default function SafeAreaViewWithBackground({ dismissKeyboardOnPress, children }) {
	const insets = useSafeAreaInsets();
	
	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
		
			<StatusBar style="dark" />

			<Image source={background} resizeMode="cover" style={{
				position: "absolute", bottom: 0, width: width, height: undefined, aspectRatio: 598/984
			}}/>

			<WrapChildrenIf
				condition={dismissKeyboardOnPress}
				wrapper={children => (
					<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
						{children}
					</TouchableWithoutFeedback>
				)}
				children={
					<View style={{ flex: 1, paddingTop: insets.top }}>
						{children}
					</View>
				}
			/>


		</View>
	);
	
	
}