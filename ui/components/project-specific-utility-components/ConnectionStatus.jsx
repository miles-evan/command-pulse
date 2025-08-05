import BetterFetch from "@/utils/BetterFetch.js";
import { useEffect, useState } from "react";
import StyledText from "@/components/general-utility-components/StyledText.jsx";

export default function ConnectionStatus({ pingInterval=10000 }) {
	
	const [connected, setConnected] = useState(false);
	const [ping, setPing] = useState(0);
	
	
	useEffect(() => {
		let timeOfLastResponse = 0;
		function tick() {
			const timeBeforeRequest = Date.now();
			if(timeBeforeRequest - timeOfLastResponse > pingInterval)
				setConnected(false);
			BetterFetch.get("http://192.168.1.202:80/command-pulse/api/v1")
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