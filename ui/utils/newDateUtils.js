

export function dayOfWeek(date, labelToday=false) {
	if(labelToday && areSameDay(date, new Date()))
		return "Today";
	return date.toLocaleDateString("en-US", { weekday: "long" });
}


// exs. MON, TUE, WED, THU
export function dayOfWeekShort(date) {
	return dayOfWeek(date).slice(0, 3).toUpperCase();
}


// returns [startDate, endDate]
// NOTE: weeks are Monday-Sunday
// week: 0 for current week, 1 for next week, -2 for 2 weeks ago, and so on
export function getWeekRange(week=0) {
	const now = new Date();
	const day = now.getDay();
	
	const diffToMonday = day === 0? -6 : 1 - day;
	
	const monday = new Date(now);
	monday.setDate(now.getDate() + diffToMonday + week * 7);
	monday.setHours(0, 0, 0, 0);
	
	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);
	sunday.setHours(23, 59, 59, 999);
	
	return [monday, sunday];
}


// returns { dateRange: [startDate, endDate], payDay }
// shows the pending cycle (you stay in the cycle until its payDay passes)
// NOTE: pay cycles are Monday-Sunday, 2-weeks, and anchored at Monday, 2025-01-06
// offset: 0 for current cycle, 1 for next cycle, -2 for 2 cycles ago, and so on
export function getPayCycleRange(offset = 0) {
	const MS_PER_DAY = 24 * 60 * 60 * 1000;
	const anchor = new Date(2025, 0, 6);
	anchor.setHours(0, 0, 0, 0);
	
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	
	const pivot = new Date(today);
	pivot.setDate(pivot.getDate() - 5);
	
	const diffDays = Math.floor((pivot - anchor) / MS_PER_DAY);
	const currentIndex = Math.floor(diffDays / 14);
	const targetIndex = currentIndex + offset;
	
	const start = new Date(anchor);
	start.setDate(anchor.getDate() + targetIndex * 14);
	
	const end = new Date(start);
	end.setDate(start.getDate() + 13);
	
	const payDay = new Date(end);
	payDay.setDate(end.getDate() + 5);
	payDay.setHours(0, 0, 0, 0);
	
	return { dateRange: [start, end], payDay };
}


// -------------------------------- Formatting to look good:


// [date1, date2] -> "7/14 - 7/27"
export function formatDateRange(weekRange) {
	const [startDate, endDate] = weekRange;
	return `${shortDate(startDate)} - ${shortDate(endDate)}`;
}


// Date -> "7/14"
export function shortDate(date) {
	return `${date.getMonth() + 1}/${date.getDate()}`;
}


// [date1, date2] -> "2:00pm-5:00pm"
export function formatTimeRange(timeRange) {
	return timeRange.map(date => superShortTime(date, true)).join("-");
}


// Date -> 8:00pm
export function shortTime(date) {
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12? "pm" : "am";
	
	hours = hours === 0? 12 : hours % 12;
	
	return `${hours}:${padZero(minutes)}${ampm}`;
}


// Date -> "8"
// Date -> "8am"
export function superShortTime(date, includePM=false) {
	return shortTime(date).replace("pm", includePM? "pm" : "").replace(":00", "");
}


// --------------------------------


export function areSameDay(date1, date2) {
	return date1.toDateString() === date2.toDateString();
}


// -------------------------------- Parsing from formatted to internal representation:


// parseTimeRange("5am-6:30", Date) -> [date1, date2]
export function parseTimeRange(timeRangeStr, baseDate) {
	const result = timeRangeStr
		.replace(/\s/g, "")
		.toUpperCase()
		.split("-")
		.map(time => {
			let ampm = "PM";
			if (/AM|PM/.test(time)) {
				ampm = time.slice(-2);
				time = time.slice(0, -2);
			}
			if (!time.includes(":")) time += ":00";
			const [hourStr, minuteStr] = time.split(":");
			let hour = parseInt(hourStr);
			const minute = parseInt(minuteStr);
			
			if (ampm === "PM" && hour !== 12) hour += 12;
			if (ampm === "AM" && hour === 12) hour = 0;
			
			const date = new Date(baseDate);
			date.setHours(hour, minute, 0, 0);
			return date;
		});
	
	if (!result[0] || !result[1]) return null;
	
	// if start is after end, assume end is next day
	if(result[0] > result[1])
		result[1] = new Date(result[1].getTime() + 1000 * 60 * 60 * 24);
	
	return result;
}


// -------------------------------- Helper functions:


// "5" -> "05"
// 5 -> "05"
function padZero(num) {
	num = Number(num);
	return (num < 10? "0" : "") + num;
}


// "05" -> "5"
function removeZeroPad(str) {
	return String(Number(str));
}


// "08:30 PM" -> "20:30"
// "12:30 AM" -> "00:30"
function convertTo24(time) {
	const [h, m, ampm] = time.split(/[: ]/);
	let hour = Number(h);
	if (ampm === "PM" && hour !== 12) hour += 12;
	if (ampm === "AM" && hour === 12) hour = 0;
	return `${padZero(hour)}:${m}`;
}