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
import { validateSignupInfo } from "@/utils/validation";
import HorizontalLine from "@/components/HorizontalLine";
import {Keyboard, TouchableWithoutFeedback} from "react-native";


export default function CreateAccount() {
	
	const params = useLocalSearchParams();
	
	
	function goToLogin() {
		router.push({
			pathname: "/setup/login",
			params: { ...params }
		});
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
					<FormHeader>Create an account</FormHeader>
					<InputBubble fieldName="email"/>
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
			
			</TouchableWithoutFeedback>
		</SafeAreaViewWithBackground>
	);
	
}
