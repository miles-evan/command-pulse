import * as Notifications from "expo-notifications";
import { useGlobalState } from "@/hooks/useGlobalState.js";
import { shortTime } from "@/utils/dateUtils.js";

export async function scheduleReminder(title, body, date) {
	const { status } = await Notifications.getPermissionsAsync();
	if (status !== "granted") return;
	
	await Notifications.scheduleNotificationAsync({
		content: { title, body },
		trigger: {
			type: Notifications.SchedulableTriggerInputTypes.DATE,
			date,
		},
	});
}


export async function cancelAllScheduledNotifications() {
	await Notifications.cancelAllScheduledNotificationsAsync();
}


// --------------------------------


// clears all notifications and then creates new ones based on shifts (only for the shifts that are yours)
export async function updateShiftNotifications(shifts, userId) {
	await cancelAllScheduledNotifications();
	shifts.filter(shift => !userId || shift.userId === userId).forEach(shift => {
		scheduleReminder(
			"Upcoming shift",
			`You're scheduled to work tomorrow at ${shortTime(shift.shiftStart)}`,
			new Date(shift.shiftStart.getTime() - 1000 * 60 * 60 * 24),
		);
		scheduleReminder(
			"Your shift begins in 1 hour",
			`You're scheduled to work at ${shortTime(shift.shiftStart)}`,
			new Date(shift.shiftStart.getTime() - 1000 * 60 * 60),
		);
		scheduleReminder(
			"Remember to clock in!",
			`Your shift just started`,
			shift.shiftStart,
		);
	})
}