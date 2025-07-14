import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/utility-components/StyledText.jsx";
import BackButton from "@/components/BackButton";


export default function NotFoundScreen() {
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<StyledText look="68 semibold veryHard" style={{ marginTop: 25 }}>Not Found</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<BackButton/>
		
		</SafeAreaViewWithBackground>
	);
	
}


