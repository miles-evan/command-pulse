import { Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from "@/constants/Colors.js";
import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";


export default function CopyButton({ textToCopy, style }) {
	return (
		<IconAndTextButton
			size={22}
			iconName="content-copy"
			onPress={() => Clipboard.setStringAsync(textToCopy)}
			style={style}
		/>
	);
}
