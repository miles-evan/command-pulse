// allows fetching to be easier. to use, import * as fetch, then do fetch.get or fetch.post


export async function post(url, body={}) {
	return await fetchWithBody((url), "POST", body);
}


export async function get(url, queryObj) {
	if(url.includes("?"))
		throw new Error("Use queryObj argument for query parameters");
	
	const fullUrl = (url) + toQueryString(queryObj);
	return await fetchWithBody(fullUrl, "GET");
}


// --------------------------------


function toQueryString(queryObj) {
	if(!queryObj) return "";
	return "?" + Object.entries(queryObj)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
}


async function fetchWithBody(url, method, body) {
	const options = {
		method,
		credentials: "include",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(body)
	}
	if(method === "GET") delete options.body
	
	const response = await fetch(url, options);
	
	if(!response.ok) console.log("NOT OKAY!!    " + response.status);
	
	return {
		status: response.status,
		ok: response.ok,
		body: await response.json()
			.catch(() => response.text())
			.catch(() => null),
		url
	};
}