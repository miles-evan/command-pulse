import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";


export default function useInitNotifications() {
	useEffect(() => {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowBanner: true,
				shouldShowList: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		});
		
		(async () => {
			let { status } = await Notifications.getPermissionsAsync();
			if(status !== "granted")
				({ status } = await Notifications.requestPermissionsAsync());
			
			if (Platform.OS === "android") {
				await Notifications.setNotificationChannelAsync("default", {
					name: "default",
					importance: Notifications.AndroidImportance.DEFAULT,
				});
			}
		})();
	}, []);
}
