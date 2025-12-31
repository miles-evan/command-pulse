import StyledText from "@/components/general-utility-components/StyledText";
import React, { useState } from "react";

export default function ToggleText(
	{ startState=0, onState0=()=>{}, onState1=()=>{}, state0Text, state1Text, ...rest }:
	{ startState: 0 | 1, onState0: () => void, onState1: () => void, state0Text: string, state1Text: string }
): React.JSX.Element {
	
	const [state, setState] = useState(startState);
	
	function toggle(): void {
		setState(prev => {
			prev === 0? onState1() : onState0();
			return 1 - prev as 0 | 1;
		});
	}
	
	return (
		<StyledText look="18 medium accent" onPress={toggle} {...rest}>
			{state === 0? state0Text : state1Text}
		</StyledText>
	);
}
