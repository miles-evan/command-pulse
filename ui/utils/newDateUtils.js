

export function dayOfWeek(date, labelToday=false) {
	if(labelToday && areSameDay(date, new Date()))
		return "Today";
	return date.toLocaleDateString("en-US", { weekday: "long" });
}


// Date -> "7/14"
export function shortDate(date) {
	return `${date.getMonth() + 1}/${date.getDate()}`
}


// Date -> 8:00pm
export function shortTime(date) {
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12? "pm" : "am";
	
	hours = hours === 0? 12 : hours % 12;
	
	return `${hours}:${padZero(minutes)}${ampm}`;
}


// --------------------------------


export function areSameDay(date1, date2) {
	return date1.toDateString() === date2.toDateString();
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