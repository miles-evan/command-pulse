import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";


export default function NotFoundScreen() {
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<StyledText look="68 semibold veryHard" style={{ marginTop: 25 }}>Not Found</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<BackButton/>
		
		</SafeAreaViewWithBackground>
	);
	
}


