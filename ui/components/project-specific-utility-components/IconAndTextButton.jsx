import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { Pressable, View } from "react-native";
import If from "@/components/general-utility-components/If.jsx";


// shows a material icon with pressing changing the style
export default function IconAndTextButton({
	onPress,
    color="accent",
    pressColor="softAccent",
	text,
	IconFamily=MaterialIcons,
	iconName,
	size=54,
	style={}, // shortcut for outer style
	innerContainerStyle={},
	outerContainerStyle={},
	fontSize,
	fontWeight,
	textStyle={},
	styledTextPropsObj={}
}) {
	
	return (
		<Pressable style={{ alignItems: "center", ...style, ...outerContainerStyle }} onPress={onPress}>
			{({ pressed }) => (
				<View style={{ alignItems: "center", ...innerContainerStyle }}>
					<IconFamily name={iconName} size={size} color={pressed? Colors[pressColor] : Colors[color]} />
					<If condition={text}>
						<StyledText
							look={`${fontSize ?? 24} ${fontWeight ?? "medium"} ${pressed? pressColor : color}`}
							style={{ marginVertical: -3, ...textStyle }}
							{...styledTextPropsObj}
						>
							{text}
						</StyledText>
					</If>
				</View>
			)}
		</Pressable>
	);
	
}