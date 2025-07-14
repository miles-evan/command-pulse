import React from "react";
import StyledText from "@/components/utility-components/StyledText.jsx";
import { FontWeights as Weights } from "@/constants/Typography";


// label under a tab icon
export default function TabTitle({ children, color }) {
	
	return (
		<StyledText
			look="13 semibold veryHard"
			style={{ color: color, flexWrap: "wrap", textAlign: "center" }}
		>
			{children}
		</StyledText>
	);
	
}