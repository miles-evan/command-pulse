import Button from "@/components/project-specific-utility-components/Button.jsx";
import * as React from "react";


export default function GenerateWithAIButton({ onPress, disabled }) {
	return (
		<Button
			look="ai"
			onPress={onPress}
			disabled={disabled}
			style={{ width: "100%", marginTop: 20 }}
		>
			Generate with AI
		</Button>
	)
}