import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import Button from "@/components/Button.jsx";
import StyledText from "@/components/utility-components/StyledText.jsx";
import FormHeader from "@/components/form-card/FormHeader";
import FormCard from "@/components/form-card/FormCard";
import Gap from "@/components/utility-components/Gap.jsx";
import HorizontalLine from "@/components/utility-components/HorizontalLine.jsx";


export default function GetStarted() {
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<Gap size={25}/>
			
			<StyledText look="68 semibold veryHard">Welcome</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<Gap size={40}/>
			<HorizontalLine/>
			<Gap size={40}/>
			
			<FormCard>
				<FormHeader>Get started</FormHeader>
				<Button look="white" to="/setup/join-company">Join a company</Button>
				<Button to="/setup/create-company" withParams={{ isCreatingCompany: true }}>Create a new company</Button>
			</FormCard>
			
		</SafeAreaViewWithBackground>
	);
	
}
