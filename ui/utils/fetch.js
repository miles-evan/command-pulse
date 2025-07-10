

export async function post(url, body={}) {
	return await fetchWithBody(url, "POST", body);
}


export async function get(url, queryObj) {
	const fullUrl = queryObj? url + toQueryString(queryObj) : url
	return await fetchWithBody(fullUrl, "GET");
}


function toQueryString(queryObj) {
	return "?" + Object.entries(queryObj)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
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