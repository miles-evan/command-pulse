import BetterFetch from "@/utils/BetterFetch.js";
import { useEffect, useState } from "react";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { API_URL } from "@/constants/apiUrl.js";

export default function ConnectionStatus({ pingInterval=10000 }) {
	
	const [connected, setConnected] = useState(false);
	const [ping, setPing] = useState(0);
	
	
	useEffect(() => {
		let timeOfLastResponse = 0;
		function tick() {
			const timeBeforeRequest = Date.now();
			if(timeBeforeRequest - timeOfLastResponse > pingInterval)
				setConnected(false);
			BetterFetch.get(API_URL)
				.then(() => {
					timeOfLastResponse = Date.now();
					setConnected(true);
					setPing(Date.now() - timeBeforeRequest);
				});
		}
		
		tick();
		const intervalId = setInterval(tick, pingInterval);
		
		return () => clearInterval(intervalId);
	}, []);
	
	
	return <StyledText look={`12 semibold ${connected? "altAccent" : "danger"}`}>
		{`${connected? "" : "dis"}connected, ping: ${ping}`}
	</StyledText>;
	
}