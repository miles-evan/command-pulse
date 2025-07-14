// server uses formats like "2025-06-31" and "07:30 PM"
// we want to see "6/31" and "7:30PM"


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


export function dayOfWeek(date) {
	if(date === getTodayString())
		return "Today";
	
	const parts = date.split("-");
	date = new Date(parts[0], parts[1] - 1, parts[2]);
	return date.toLocaleDateString("en-US", { weekday: "long" });
}


export function shortenDate(date) {
	const parts = date.split("-");
	return `${removeZeroPad(parts[1])}/${removeZeroPad(parts[2])}`
}


export function shortenTime(time) {
	const parts = time.split(/[: ]/);
	return `${removeZeroPad(parts[0])}:${parts[1]}${parts[2].toLowerCase()}`;
}


// --------------------------------


export function compareDateTimes(date1, time1, date2, time2) {
	return Date.parse(`${date1}T${convertTo24(time1)}`) - Date.parse(`${date2}T${convertTo24(time2)}`);
}

function convertTo24(time) {
	const [h, m, ampm] = time.split(/[: ]/);
	let hour = Number(h);
	if (ampm === "PM" && hour !== 12) hour += 12;
	if (ampm === "AM" && hour === 12) hour = 0;
	return `${padZero(hour)}:${m}`;
}


// --------------------------------


function padZero(num) {
	num = Number(num);
	return (num < 10? "0" : "") + num;
}


function removeZeroPad(str) {
	return String(Number(str));
}