import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/Gap";
import ErrorMessages from "@/components/form-card/ErrorMessages";
import * as companyService from "@/services/companyService";
import { validateInviteCode } from "@/scripts/validation";
import HorizontalLine from "@/components/HorizontalLine";


export default function JoinCompany() {
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<Gap size={8}/>
			<BackButton/>
			
			<StyledText look="68 semibold veryHard">Set up</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<Gap size={40}/>
			<HorizontalLine/>
			<Gap size={40}/>
			
			<FormCard>
				<FormHeader>Join company</FormHeader>
				<InputBubble fieldName="inviteCode" placeholder={"Join code"} submitOnEnter/>
				<ErrorMessages validate={validateInviteCode}/>
				<SubmitButton to="/setup/create-account">Next</SubmitButton>
			</FormCard>
		
		</SafeAreaViewWithBackground>
	);
	
}
