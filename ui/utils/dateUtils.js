

export function getTodayString() {
	return new Date().toISOString().slice(0, 10)
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
	return `${removeZeroPad(parts[0])}:${parts[1]} ${parts[2].toLowerCase()}`;
}


// --------------------------------


function padZero(num) {
	num = Number(num);
	return (num < 10? "0" : "") + num;
}


function removeZeroPad(str) {
	return String(Number(str));
}