import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import Button from "@/components/Button.jsx";
import StyledText from "@/components/StyledText";
import FormHeader from "@/components/form-card/FormHeader";
import FormCard from "@/components/form-card/FormCard";
import Gap from "@/components/Gap";
import HorizontalLine from "@/components/HorizontalLine";


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
