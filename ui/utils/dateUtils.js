// server uses formats like "2025-06-31" and "07:30 PM" and weeks are Monday-Sunday
// we want to see "6/31" and "7:00PM" or sometimes just "7"


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


// --------------------------------


// turns date object to date string
export function dateObjectToString(dateObject) {
	return `${dateObject.getFullYear()}-${padZero(dateObject.getMonth() + 1)}-${padZero(dateObject.getDate())}`;
}


// { startDate: "2025-07-14", endDate: "2025-07-27" } -> "7/14 - 7/27"
export function formatWeekRange(weekRange) {
	const [startDate, endDate] = weekRange;
	return `${shortenDate(startDate)} - ${shortenDate(endDate)}`;
}


// "2025-07-14" -> "7/14"
export function shortenDate(date) {
	const parts = date.split("-");
	return `${removeZeroPad(parts[1])}/${removeZeroPad(parts[2])}`
}


// "08:30 AM" -> "8:30am"
export function shortenTime(time) {
	const parts = time.split(/[: ]/);
	return `${removeZeroPad(parts[0])}:${parts[1]}${parts[2].toLowerCase()}`;
}


// "08:00 PM" -> "8", "08:00 AM" -> "8am"
export function superShortenTime(time) {
	const parts = time.split(/[: ]/);
	parts[1] = parts[1] === "00"? "" : ":" + parts[1];
	parts[2] = parts[2] === "PM"? "" : "am";
	return removeZeroPad(parts[0]) + parts[1] + parts[2];
}


// --------------------------------


// difference in milliseconds
export function compareDateTimes(date1, time1, date2, time2) {
	return Date.parse(`${date1}T${convertTo24(time1)}`) - Date.parse(`${date2}T${convertTo24(time2)}`);
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


// --------------------------------


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