import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/utility-components/StyledText.jsx";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/utility-components/Gap.jsx";
import ErrorMessages from "@/components/form-card/ErrorMessages";
import { validateCompanyName } from "@/utils/validation";
import HorizontalLine from "@/components/utility-components/HorizontalLine.jsx";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import If from "@/components/utility-components/If.jsx";
import useKeyboardVisible from "@/hooks/useKeyboardVisible.js";


export default function CreateCompany() {
	
	const keyboardVisible = useKeyboardVisible();
	
	
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
			<If condition={keyboardVisible}>
				<Gap size={20}/>
			</If>

			<FormCard>
				<FormHeader>Create company</FormHeader>
				<InputBubble fieldName="companyName" placeholder={"Company name"} submitOnEnter/>
				<ErrorMessages validate={validateCompanyName}/>
				<SubmitButton to="/setup/create-account">Next</SubmitButton>
			</FormCard>

		</SafeAreaViewWithBackground>
	);
	
}
