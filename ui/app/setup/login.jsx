import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/Gap";
import { useLocalSearchParams } from "expo-router";
import ErrorMessages from "@/components/form-card/ErrorMessages";
import { validateLoginInfo } from "@/scripts/validation";
import * as userService from "@/services/userService.js";
import * as companyService from "@/services/companyService";
import HorizontalLine from "@/components/HorizontalLine";


export default function Login() {
	
	const { isCreatingCompany, inviteCode, companyName } = useLocalSearchParams();
	
	
	async function loginAndJoinOrCreateCompany({ email, password }) {
		await userService.login(email, password);
		
		await companyService.leave();
		
		if(isCreatingCompany) {
			await companyService.create(companyName);
		} else {
			await companyService.join(inviteCode);
		}
		
		console.log(await companyService.status());
	}
	
	
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
				<FormHeader>Login</FormHeader>
				<InputBubble fieldName="email"/>
				<InputBubble fieldName="password" secureTextEntry submitOnEnter/>
				<ErrorMessages validate={validateLoginInfo}/>
				<SubmitButton onSubmit={loginAndJoinOrCreateCompany}>Finish</SubmitButton>
			</FormCard>
		
		</SafeAreaViewWithBackground>
	);
	
}
