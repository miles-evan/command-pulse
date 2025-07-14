import {Pressable, View} from "react-native";
import FlexRowSpaceBetween from "@/components/utility-components/FlexRowSpaceBetween.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Colors} from "@/constants/Colors.js";


// children is a string of text to display in the selector
export default function LeftRightSelector({ onLeft, onRight, containerStyle={}, textStyle={}, children }) {
	
	return (
		<FlexRowSpaceBetween style={containerStyle}>
			
			<Pressable onPress={onLeft}>
				<MaterialIcons name="arrow-back-ios" size={24} color={Colors.accent} />
			</Pressable>
			
			<StyledText look="34 medium veryHard" style={textStyle}>
				{children}
			</StyledText>
			
			<Pressable onPress={onRight}>
				<MaterialIcons name="arrow-forward-ios" size={24} color={Colors.accent} />
			</Pressable>
			
		</FlexRowSpaceBetween>
	);
	
}