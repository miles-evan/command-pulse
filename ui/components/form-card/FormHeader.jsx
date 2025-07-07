import {Text, View} from "react-native";
import StyledText from "@/components/StyledText";


export default function FormHeader({ children }) {
	
	return (
		<StyledText look="44 medium veryHard" style={{ marginVertical: 8 }}>
			{children}
		</StyledText>
	);
	
}