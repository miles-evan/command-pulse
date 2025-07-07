import { View, Text, StyleSheet } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Hello World</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column"
	},
	text: {
		color: "white",
		fontSize: 42,
		fontWeight: "bold",
		textAlign: "center"
	}
});