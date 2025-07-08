import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import Button from "@/components/Button.jsx";
import StyledText from "@/components/StyledText";
import FormHeader from "@/components/form-card/FormHeader";
import FormCard from "@/components/form-card/FormCard";
import * as userService from "@/services/userService.js";


export default function GetStarted() {
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<StyledText look="68 semibold veryHard" style={{ marginTop: 25 }}>Welcome</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<FormCard style={{ marginTop: "100" }}>
				<FormHeader>Get started</FormHeader>
				<Button look="white" to="/setup/join-company">Join a company</Button>
				<Button>Create a new company</Button>
			</FormCard>
			
		</SafeAreaViewWithBackground>
	);
	
}
