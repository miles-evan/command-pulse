

export function getToday() {
	return new Date().toISOString().slice(0, 10)
}


export function dateOfWeek(date) {
	const parts = date.split("-");
	date = new Date(parts[0], parts[1] - 1, parts[2]);
	return date.toLocaleDateString("en-US", { weekday: "long" });
}


export function shortenDate(date) {
	const parts = date.split("-");
	return `${Number(parts[1])}/${Number(parts[2])}`
}


export function formatTime(time) {
	const parts = time.split(" ");
	return parts[0] + parts[1].toLowerCase();
}