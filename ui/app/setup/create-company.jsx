import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/Gap";


export default function CreateCompany() {
	
	return (
		<SafeAreaViewWithBackground>
			
			<Gap size={10}/>
			
			<BackButton/>
			
			<StyledText look="68 semibold veryHard">Set up</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<Gap size={95}/>
			
			<FormCard>
				<FormHeader>Create company</FormHeader>
				<InputBubble fieldName="companyName" placeholder={"Company name"}/>
				<SubmitButton to="/setup/create-account">Next</SubmitButton>
			</FormCard>
		
		</SafeAreaViewWithBackground>
	);
	
}
