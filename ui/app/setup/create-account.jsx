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
import { validateSignupInfo } from "@/utils/validation";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import If from "@/components/general-utility-components/If.jsx";
import useKeyboardVisible from "@/hooks/useKeyboardVisible.js";


export default function CreateAccount() {
	
	const params = useLocalSearchParams();
	const keyboardVisible = useKeyboardVisible();
	
	
	function goToLogin() {
		router.push({
			pathname: "/setup/login",
			params: { ...params }
		});
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
				<FormHeader>Create an account</FormHeader>
				<InputBubble fieldName="email" keyboardType="email-address"/>
				<InputBubble fieldName="password" secureTextEntry submitOnEnter/>
				<ErrorMessages validate={validateSignupInfo}/>
				<SubmitButton to="/setup/personal-info">Next</SubmitButton>
			</FormCard>
			
			<Gap size={8}/>
			
			<StyledText look="18 regular veryHard">
				Already have an account?{" "}
				<StyledText look="18 regular accent" style={{ textDecorationLine: "underline" }} onPress={goToLogin}>
					Log in
				</StyledText>
			</StyledText>

		</SafeAreaViewWithBackground>
	);
	
}
