import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { router, useLocalSearchParams } from "expo-router";
import ErrorMessages from "@/components/form-card/ErrorMessages";
import { validateLoginInfo } from "@/utils/validation";
import * as userService from "@/services/userService.js";
import * as companyService from "@/services/companyService";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import {useRef} from "react";
import {storeCredentials} from "@/utils/AsyncStorageAuthentication";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import If from "@/components/general-utility-components/If.jsx";
import useKeyboardVisible from "@/hooks/useKeyboardVisible.js";


export default function Login() {
	
	const { isCreatingCompany, inviteCode, companyName, alreadyInCompany } = useLocalSearchParams();
	const setErrorMessagesRef = useRef(() => {});
	const keyboardVisible = useKeyboardVisible();
	
	
	async function loginAndJoinOrCreateCompany({ email, password }) {
		const response = await userService.login(email, password);
		if(!response.ok)
			return setErrorMessagesRef.current(["Incorrect email or password"]);
		
		await storeCredentials(email, password);
		
		if(!alreadyInCompany) {
			await companyService.leave();
			if(isCreatingCompany) {
				await companyService.create(companyName);
			} else {
				await companyService.join(inviteCode);
			}
		}
		
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
				<FormHeader>Login</FormHeader>
				<InputBubble fieldName="email" keyboardType="email-address"/>
				<InputBubble fieldName="password" secureTextEntry submitOnEnter/>
				<ErrorMessages validate={validateLoginInfo} setErrorMessagesRef={setErrorMessagesRef}/>
				<SubmitButton onSubmit={loginAndJoinOrCreateCompany}>Finish</SubmitButton>
			</FormCard>

		</SafeAreaViewWithBackground>
	);
	
}
