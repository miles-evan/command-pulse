
// Makes fetching easier
export default class BetterFetch {
	
	static async post(url, body={}) {
		return await fetchWithBody(url, "POST", body);
	}
	
	static async put(url, body={}) {
		return await fetchWithBody(url, "PUT", body);
	}
	
	static async delete(url, body={}) {
		return await fetchWithBody(url, "DELETE", body);
	}
	
	static async get(url, queryObj) {
		if(url.includes("?"))
			throw new Error("Use queryObj argument for query parameters");
		
		const fullUrl = url + toQueryString(queryObj);
		return await fetchWithBody(fullUrl, "GET");
	}
	
};


function toQueryString(queryObj) {
	if(!queryObj) return "";
	return "?" + Object.entries(queryObj)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
}


async function fetchWithBody(url, method, body, retries=3) {
	try {
		const options = {
			method,
			credentials: "include",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(body)
		}
		if(method === "GET") delete options.body
		
		// if(url !== "http://192.168.1.202:80/command-pulse/api/v1") console.log("about to fetch", method, url)
		const response = await fetch(url, options);
		// if(url !== "http://192.168.1.202:80/command-pulse/api/v1") console.log("fetch complete", method, url)
		
		const responseBody = await response.json()
			.catch(() => response.text())
			.catch(() => null);
		
		if(!response.ok) console.log(
			"\n\nNOT OKAY!! Error " + response.status
			+ "\nBody: " + JSON.stringify(responseBody)
			+ "\nURL " + url
			+ "\nMETHOD " + method
		);
		
		return {
			status: response.status,
			ok: response.ok,
			body: responseBody,
			url,
		};
	} catch(e) {
		console.log(e);
		if(
			e instanceof TypeError
			&& ["Network request failed", "Network request timed out", "Failed to fetch"].includes(e?.message)
			&& retries > 0
		) {
			await new Promise(res => setTimeout(res, 500));
			return fetchWithBody(url, method, body, retries - 1);
		}
		throw e;
	}
}