import { useContext, useEffect, useRef } from "react";
import { FormContext } from "./FormCard.jsx";
import { TextInput, StyleSheet, View } from "react-native";
import { FontWeights } from "@/constants/Typography";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";


export default function InputBubble({ fieldName, placeholder, secureTextEntry, submitOnEnter, style={} }) {
	
	const { inputValuesRef, submitRef } = useContext(FormContext);
	
	
	useEffect(() => {
		inputValuesRef.current[fieldName] = "";
	}, []);
	
	
	const styles = getStyles(style);
	
	
	return (
		<View style={styles.wrapper}>
			
			<TextInput
				placeholder={placeholder ?? fieldName}
				secureTextEntry={secureTextEntry}
				onChangeText={value => inputValuesRef.current[fieldName] = value}
				onSubmitEditing={() => {
					if(submitOnEnter) submitRef.current();
				}}
				placeholderTextColor={Colors.softAccent}
				style={styles.inputBubble}
			/>
			
			<LinearGradient
				colors={["rgba(0,0,0,0.1)", "transparent"]}
				style={styles.topShadow}
				pointerEvents="none"
			/>
			
		</View>
		
	);
}


function getStyles(style) {
	return StyleSheet.create({
		inputBubble: {
			flex: 1, // new
			width: "100%", // new
			
			fontSize: 20,
			fontWeight: FontWeights.regular,
			color: Colors.veryHard,
			
			// width: "90%",
			// height: 44,
			
			paddingLeft: 15,
			
			borderRadius: 48,
			
			marginHorizontal: "auto",
			// marginVertical: 8,
			
			backgroundColor: Colors.verySoft,
			borderWidth: 1,
			borderColor: Colors.soft,
			
			...style
		},
		
		wrapper: {
			position: "relative",
			width: "90%",
			height: 44,
			marginHorizontal: "auto",
			marginVertical: 8,
			alignSelf: "center",
			borderRadius: 48,
			overflow: "hidden",
		},
		
		topShadow: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			height: 6,
			borderTopLeftRadius: 48,
			borderTopRightRadius: 48
		},
	});
}