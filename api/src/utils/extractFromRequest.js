export default function extractFromRequest(request, pathArray) {
	let result = request;
	pathArray.forEach(attr => result = result[attr]);
	return result;
}