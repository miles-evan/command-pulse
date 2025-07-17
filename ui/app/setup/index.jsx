import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import FormHeader from "@/components/form-card/FormHeader";
import FormCard from "@/components/form-card/FormCard";
import Gap from "@/components/general-utility-components/Gap.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";


export default function GetStarted() {
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<Gap size={25}/>
			
			<StyledText look="68 semibold veryHard">Welcome</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<Gap size={40}/>
			
			<FormCard>
				<FormHeader>Get started</FormHeader>
				<Button look="white" to="/setup/join-company">Join a company</Button>
				<Button to="/setup/create-company" withParams={{ isCreatingCompany: true }}>Create a new company</Button>
			</FormCard>
			
		</SafeAreaViewWithBackground>
	);
	
}
