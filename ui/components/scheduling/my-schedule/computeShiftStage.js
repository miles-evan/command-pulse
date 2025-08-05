
// computes whether it should show the clock in button, clock out button, and so on
export function computeShiftStage({ shiftStart, shiftEnd, clockInTime, clockOutTime }) {
	
	const now = new Date();
	const minsUntilStartTime = (shiftStart - now) / (1000 * 60);
	const minsUntilEndTime = (shiftEnd - now) / (1000 * 60);
	
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