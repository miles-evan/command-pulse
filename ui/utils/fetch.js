

export async function post(url, body={}) {
	return await fetchWithBody(url, "POST", body);
}


export async function get(url) {
	return await fetchWithBody(url, "GET");
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


// async function fetchWithBody(url, method, body) {
// 	const cookieHeader = await getCookieHeader(url);
//
// 	const options = {
// 		method,
// 		credentials: "include",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(body)
// 	}
// 	if(method === "GET") delete options.body
// 	if(cookieHeader) options.headers.Cookie = cookieHeader;
//
// 	const response = await fetch(url, options);
//
// 	const setCookie = response.headers.get("Set-Cookie");
// 	if (setCookie) await Cookies.set(url, parseSetCookie(setCookie));
//
// 	if(!response.ok) console.log("NOT OKAY!!    " + response.status);
// 	return {
// 		status: response.status,
// 		ok: response.ok,
// 		body: await response.json()
// 			.catch(() => response.text())
// 			.catch(() => null),
// 		url
// 	};
// }
//
//
// async function getCookieHeader(url) {
// 	const cookies = await Cookies.get(url);
// 	if (!cookies) return "";
// 	return Object.entries(cookies)
// 		.map(([key, val]) => `${key}=${val.value}`)
// 		.join("; ");
// }
//
//
// // Parse Set-Cookie string into an object for Cookies.set()
// function parseSetCookie(setCookie) {
// 	const parts = setCookie.split(";");
// 	const [nameValue, ...attributes] = parts;
// 	const [name, value] = nameValue.split("=");
//
// 	const cookie = {
// 		name: name.trim(),
// 		value: value.trim(),
// 		path: "/"
// 	};
//
// 	attributes.forEach(attr => {
// 		const [attrName, attrValue] = attr.split("=");
// 		if (attrName && attrValue) {
// 			cookie[attrName.trim().toLowerCase()] = attrValue.trim();
// 		}
// 	});
//
// 	return cookie;
// }