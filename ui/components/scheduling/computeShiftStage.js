import { compareDateTimes, getCurrentTimeString, getTodayString } from "@/utils/dateUtils";


// computes whether it should show the clock in button, clock out button, and so on
export function computeShiftStage({ date, startTime, endTime, clockInTime, clockOutTime }) {
	const todayDateString = getTodayString();
	const currentTimeString = getCurrentTimeString();
	
	const minsUntilStartTime = compareDateTimes(date, startTime, todayDateString, currentTimeString) / (1000*60);
	const minsUntilEndTime = compareDateTimes(date, endTime, todayDateString, currentTimeString) / (1000*60);
	
	if(minsUntilStartTime > 30 || minsUntilEndTime < -1440) {
		return 0;
	} else if(clockInTime === null && minsUntilStartTime <= 30 && minsUntilEndTime >= 0) {
		return 1;
	} else if(clockInTime !== null && clockOutTime === null && minsUntilEndTime > -120) {
		return 2;
	} else {
		return 3;
	}
}