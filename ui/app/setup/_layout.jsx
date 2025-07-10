import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Slot } from 'expo-router';

export default function SetupLayout() {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<Slot />
		</TouchableWithoutFeedback>
	);
}
