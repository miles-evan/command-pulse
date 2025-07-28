// server uses formats like "2025-06-31" and "07:30 PM" and weeks are Monday-Sunday
// we want to see "6/31" and "7:00PM" or sometimes just "7"


// -------------------------------- Getting current info:


export function getTodayString() {
	const date = new Date();
	const year = date.getFullYear();
	const month = padZero(date.getMonth() + 1);
	const day = padZero(date.getDate())
	return `${year}-${month}-${day}`;
}


export function getCurrentTimeString() {
	const date = new Date();
	let hours = date.getHours();
	const minutes = date.getMinutes();
	
	const ampm = hours >= 12 ? "PM" : "AM";
	
	hours = hours % 12;
	if (hours === 0) hours = 12;
	
	return `${padZero(hours)}:${padZero(minutes)} ${ampm}`;
}


// exs. MON, TUE, WED, THU
export function dayOfWeekShort(date) {
	return dayOfWeek(date).slice(0, 3).toUpperCase();
}


export function dayOfWeek(date, labelToday=false) {
	if(labelToday && date === getTodayString())
		return "Today";
	
	const parts = date.split("-");
	date = new Date(parts[0], parts[1] - 1, parts[2]);
	return date.toLocaleDateString("en-US", { weekday: "long" });
}


// returns [startDate, endDate]
// NOTE: weeks are Monday-Sunday
// week: 0 for current week, 1 for next week, -2 for 2 weeks ago, and so on
export function getWeekRange(week=0) {
	const now = new Date();
	const day = now.getDay();
	
	const diffToMonday = day === 0 ? -6 : 1 - day;
	
	const monday = new Date(now);
	monday.setDate(now.getDate() + diffToMonday + week * 7);
	monday.setHours(0, 0, 0, 0);
	
	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);
	sunday.setHours(23, 59, 59, 999);
	
	return [dateObjectToString(monday), dateObjectToString(sunday)];
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
	
	return {
		dateRange: [
			dateObjectToString(start),
			dateObjectToString(end),
		],
		payDay: dateObjectToString(payDay),
	};
}


// // returns { dateRange: [startDate, endDate], payDay } for the 2-week pay cycle anchored at Monday, 2025-01-06
// // NOTE: pay cycles are Monday-Sunday
// // offset: 0 for current cycle, 1 for next cycle, -2 for 2 cycles ago, and so on
// export function getPayCycleRange(offset=0) {
// 	const MS_PER_DAY = 24 * 60 * 60 * 1000;
// 	const anchor = new Date(2025, 0, 6);
// 	anchor.setHours(0, 0, 0, 0);
//
// 	const now = new Date();
// 	const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//
// 	const diffDays = Math.round((todayMid - anchor) / MS_PER_DAY);
//
// 	const currentIndex = Math.floor(diffDays / 14);
// 	const targetIndex = currentIndex + offset;
//
// 	const start = new Date(anchor);
// 	start.setDate(anchor.getDate() + targetIndex * 14);
// 	const end = new Date(start);
// 	end.setDate(start.getDate() + 13);
//
// 	const payDay = new Date(end);
// 	payDay.setDate(end.getDate() + 5);
// 	payDay.setHours(0, 0, 0, 0);
//
// 	return {
// 		dateRange: [dateObjectToString(start), dateObjectToString(end)],
// 		payDay: dateObjectToString(payDay),
// 	};
// }


// -------------------------------- Formatting to look good:


// turns date object to date string
export function dateObjectToString(dateObject) {
	return `${dateObject.getFullYear()}-${padZero(dateObject.getMonth() + 1)}-${padZero(dateObject.getDate())}`;
}


// ["2025-07-14", "2025-07-27"] -> "7/14 - 7/27"
export function formatDateRange(weekRange) {
	const [startDate, endDate] = weekRange;
	return `${shortenDate(startDate)} - ${shortenDate(endDate)}`;
}


// "2025-07-14" -> "7/14"
export function shortenDate(date) {
	const parts = date.split("-");
	return `${removeZeroPad(parts[1])}/${removeZeroPad(parts[2])}`
}


// "08:00 PM" -> "8:00pm"
export function shortenTime(time) {
	const parts = time.split(/[: ]/);
	return `${removeZeroPad(parts[0])}:${parts[1]}${parts[2].toLowerCase()}`;
}


// "08:00 PM" -> "8"
// "08:00 AM" -> "8am"
export function superShortenTime(time, includePM=false) {
	const parts = time.split(/[: ]/);
	parts[1] = parts[1] === "00"? "" : ":" + parts[1];
	parts[2] = parts[2] === "PM"? includePM? "pm" : "" : "am";
	return removeZeroPad(parts[0]) + parts[1] + parts[2];
}


// -------------------------------- Comparisons:


// difference in milliseconds
export function compareDateTimes(date1, time1, date2, time2) {
	return Date.parse(`${date1}T${convertTo24(time1)}`) - Date.parse(`${date2}T${convertTo24(time2)}`);
}


// getRelativeDate("2025-07-21", -2) -> "2025-07-19"
export function getRelativeDate(date, offset) {
	let [year, month, day] = date.split("-").map(Number);
	const d = new Date(Date.UTC(year, month - 1, day));
	d.setUTCDate(d.getUTCDate() + offset);
	year = d.getUTCFullYear();
	month = padZero(d.getUTCMonth() + 1);
	day = padZero(d.getUTCDate());
	return `${year}-${month}-${day}`;
}


// -------------------------------- Parsing from formatted to internal representation:


// "5am-6:30" -> ["05:00 AM", "06:30 PM"]
export function parseTimeRange(timeRange) {
	if(typeof timeRange !== "string")
		return null;
	
	const result = timeRange
		.replace(/\s/g, "")
		.toUpperCase()
		.split("-")
		.map(time => {
			let ampm = "PM";
			if(/AM|PM/.test(time)) {
				ampm = time.slice(-2);
				time = time.slice(0, -2)
			}
			if(!time.includes(":")) time += ":00"
			const [hour, minute] = time.split(":");
			const result = `${padZero(hour)}:${minute} ${ampm}`;
			return /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/.test(result)? result : null;
		});
	
	return result[0] && result[1]? result : null;
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