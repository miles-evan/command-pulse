import background from "@/assets/images/background.png";
import {View, Image, Dimensions, Keyboard, TouchableWithoutFeedback} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WrapChildrenIf from "@/components/general-utility-components/WrapChildrenIf.jsx";


const { width } = Dimensions.get("window");


export default function SafeAreaViewWithBackground({
	dismissKeyboardOnPress, children, backgroundImageComponent, style
}) {
	
	const insets = useSafeAreaInsets();
	
	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
		
			<StatusBar style="dark" />
			
			{backgroundImageComponent ?? (
				<Image source={background} resizeMode="cover" style={{
					position: "absolute", bottom: 0, width: width, height: undefined, aspectRatio: 598/984, opacity: 0.75
				}}/>
			)}
			

			<WrapChildrenIf
				condition={dismissKeyboardOnPress}
				wrapper={children => (
					<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
						{children}
					</TouchableWithoutFeedback>
				)}
				children={
					<View style={{ flex: 1, paddingTop: insets.top, ...style }}>
						{children}
					</View>
				}
			/>
			
		</View>
	);
	
}