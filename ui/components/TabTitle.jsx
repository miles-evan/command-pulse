import React from "react";
import StyledText from "@/components/StyledText";
import { FontWeights as Weights } from "@/constants/Typography";


export default function TabTitle({ children, color }) {
	
	return (
		<StyledText
			look="13 semibold veryHard"
			style={{ fontSize: 13, fontWeight: Weights.semibold, color: color, flexWrap: "wrap", textAlign: "center" }}
		>
			{children}
		</StyledText>
	);
	
}