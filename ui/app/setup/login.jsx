import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/Gap";
import { router, useLocalSearchParams } from "expo-router";
import ErrorMessages from "@/components/form-card/ErrorMessages";
import { validateLoginInfo } from "@/utils/validation";
import * as userService from "@/services/userService.js";
import * as companyService from "@/services/companyService";
import HorizontalLine from "@/components/HorizontalLine";
import {useRef} from "react";
import {storeCredentials} from "@/utils/AsyncStorageAuthentication";
import {Keyboard, TouchableWithoutFeedback} from "react-native";


export default function Login() {
	
	const { isCreatingCompany, inviteCode, companyName } = useLocalSearchParams();
	const setErrorMessagesRef = useRef(() => {});
	
	
	async function loginAndJoinOrCreateCompany({ email, password }) {
		const response = await userService.login(email, password);
		if(!response.ok)
			return setErrorMessagesRef.current(["Incorrect email or password"]);
		
		await storeCredentials(email, password);
		
		await companyService.leave();
		
		if(isCreatingCompany) {
			await companyService.create(companyName);
		} else {
			await companyService.join(inviteCode);
		}
		
		console.log(await companyService.status());
		
		router.replace("/(tabs)/announcements");
	}
	
	
	return (
		<SafeAreaViewWithBackground>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			
				<Gap size={8}/>
				<BackButton/>
				
				<StyledText look="68 semibold veryHard">Set up</StyledText>
				<StyledText look="44 medium veryHard">Command Pulse</StyledText>
				
				<Gap size={35}/>
				<HorizontalLine/>
				<Gap size={35}/>
				
				<FormCard>
					<FormHeader>Login</FormHeader>
					<InputBubble fieldName="email"/>
					<InputBubble fieldName="password" secureTextEntry submitOnEnter/>
					<ErrorMessages validate={validateLoginInfo} setErrorMessagesRef={setErrorMessagesRef}/>
					<SubmitButton onSubmit={loginAndJoinOrCreateCompany}>Finish</SubmitButton>
				</FormCard>
			
			</TouchableWithoutFeedback>
		</SafeAreaViewWithBackground>
	);
	
}
