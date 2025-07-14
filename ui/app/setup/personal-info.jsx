import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/utility-components/StyledText.jsx";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/utility-components/Gap.jsx";
import {router, useLocalSearchParams} from "expo-router";
import * as userService from "@/services/userService";
import * as companyService from "@/services/companyService";
import { validatePersonalInfo } from "@/utils/validation";
import ErrorMessages from "@/components/form-card/ErrorMessages";
import HorizontalLine from "@/components/utility-components/HorizontalLine.jsx";
import {storeCredentials} from "@/utils/AsyncStorageAuthentication";
import If from "@/components/utility-components/If.jsx";
import useKeyboardVisible from "@/hooks/useKeyboardVisible.js";


export default function PersonalInfo() {
	
	const { isCreatingCompany, inviteCode, email, password, companyName } = useLocalSearchParams();
	const keyboardVisible = useKeyboardVisible();
	
	
	async function signUpAndJoinOrCreateCompany({ firstName, lastName, phoneNumber }) {
		await userService.signup(email, password, firstName, lastName, phoneNumber);
		await userService.login(email, password);
		
		await storeCredentials(email, password);
		
		console.log(await userService.status())
		
		if(isCreatingCompany) {
			await companyService.create(companyName);
		} else {
			await companyService.join(inviteCode);
		}
		
		console.log(await companyService.status());
		
		router.replace("/(tabs)/announcements");
	}
	
	
	return (
		<SafeAreaViewWithBackground dismissKeyboardOnPress>
			
			<Gap size={8}/>
			<BackButton/>

			<StyledText look="68 semibold veryHard">Set up</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<If condition={!keyboardVisible}>
				<Gap size={35}/>
				<HorizontalLine/>
				<Gap size={35}/>
			</If>

			<FormCard>
				<FormHeader>Personal info</FormHeader>
				<InputBubble fieldName="firstName" placeholder="first name"/>
				<InputBubble fieldName="lastName" placeholder="last name"/>
				<InputBubble fieldName="phoneNumber" placeholder="phone number" submitOnEnter/>
				<ErrorMessages validate={validatePersonalInfo}/>
				<SubmitButton onSubmit={signUpAndJoinOrCreateCompany}>Finish</SubmitButton>
			</FormCard>

		</SafeAreaViewWithBackground>
	);
	
}
