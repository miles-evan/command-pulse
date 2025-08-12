export default function extractFromRequest(request, pathArray) {
	if(!request) throw new Error("cannot extract from null or undefined request")
	let result = request;
	pathArray.forEach(attr => {
		if(result === undefined)
			return undefined;
		result = result[attr]
	});
	return result;
}