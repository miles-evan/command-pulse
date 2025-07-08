import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";


export default function JoinCompany() {
	
	return (
		<SafeAreaViewWithBackground>
			<BackButton/>
			
			<StyledText look="68 semibold veryHard" style={{ marginTop: 25 }}>Set up</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<FormCard style={{ marginTop: "100" }}>
				<FormHeader>Join company</FormHeader>
				<InputBubble fieldName="inviteCode" placeholder={"Join code"}/>
				<Button>Next</Button>
			</FormCard>
		
		</SafeAreaViewWithBackground>
	);
	
}
