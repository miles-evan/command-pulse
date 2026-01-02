import { Alert } from "react-native";

// asks the user through a popup if they are sure they want to do it, then calls your function
export default function askFirst(
	fn: () => void, popupTitle?: string, popupSubtitle?: string, cancelMessage?: string, confirmMessage?: string
): void {
	Alert.alert(
		popupTitle ?? "Are you sure?", popupSubtitle ?? "This action cannot be undone.",
		[{ text: cancelMessage ?? "Cancel", style: "cancel" },
		{ text: confirmMessage ?? "Confirm", onPress: () => fn() }]
	);
}