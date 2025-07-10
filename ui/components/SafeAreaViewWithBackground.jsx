import background from "@/assets/images/squares-background.png";
import { SafeAreaView, View, Image, Dimensions, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";


const { width } = Dimensions.get("window");


export default function SafeAreaViewWithBackground({ children }) {
	
	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
		
			<StatusBar style="dark" />
			
			<Image source={background} resizeMode="cover" style={styles.image}/>
			
			<SafeAreaView style={{ flex: 1 }}>
				{children}
			</SafeAreaView>
		
		</View>
	);
	
	
}


const styles = StyleSheet.create({
	image: {
		position: "absolute",
		bottom: 0,
		width: width,
		height: undefined,
		aspectRatio: 598/984,
	},
});