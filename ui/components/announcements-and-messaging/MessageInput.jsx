import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import { Colors } from "@/constants/Colors.js";


export default function MessageInput({ valueRef, ...rest }) {
	
	return (
		<StyledTextInput
			placeholder="Write an announcement..."
			style={{
				borderRadius: 48,
				borderWidth: 3,
				borderColor: Colors.accent,
				fontSize: 20,
				flex: 1,
				textAlign: "left",
				paddingHorizontal: 18,
				backgroundColor: Colors.verySoft,
			}}
			valueRef={valueRef}
			{...rest}
		/>
	);
	
}