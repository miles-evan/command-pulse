import { Pressable } from "react-native";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";


// children is a string of text to display in the selector
export default function LeftRightSelector({ onLeft, onRight, leftDisabled, rightDisabled, containerStyle={}, textStyle={}, children, ...rest }) {
	
	if(leftDisabled) onLeft = () => {};
	if(rightDisabled) onRight = () => {};
	
	
	return (
		<FlexRowSpaceBetween style={{ alignItems: "center", ...containerStyle }}>
			
			<Pressable onPress={onLeft}>
				{({ pressed }) => (
					<MaterialIcons name="arrow-back-ios" size={35} color={pressed || leftDisabled? Colors.softAccent : Colors.accent}/>
				)}
			</Pressable>
			
			<StyledText look="34 medium veryHard" width="75%" numberOfLines={1} adjustsFontSizeToFit style={textStyle} {...rest}>
				{children}
			</StyledText>
			
			<Pressable onPress={onRight}>
				{({ pressed }) => (
					<MaterialIcons name="arrow-forward-ios" size={35} color={pressed || rightDisabled? Colors.softAccent : Colors.accent} />
				)}
			</Pressable>
			
		</FlexRowSpaceBetween>
	);
	
}