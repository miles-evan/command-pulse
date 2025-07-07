import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import Button from "@/components/Button";


export default function JoinCompany() {
	
	return (
		<SafeAreaViewWithBackground>
			
			<StyledText look="68 semibold veryHard" style={{ marginTop: 25 }}>Set up</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<FormCard style={{ marginTop: "100" }}>
				<FormHeader>Join company</FormHeader>
				<Button>Next</Button>
			</FormCard>
		
		</SafeAreaViewWithBackground>
	);
	
}
