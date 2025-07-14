import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/Gap";
import ErrorMessages from "@/components/form-card/ErrorMessages";
import { validateCompanyName } from "@/utils/validation";
import HorizontalLine from "@/components/HorizontalLine";
import {Keyboard, TouchableWithoutFeedback} from "react-native";


export default function CreateCompany() {
	
	return (
		<SafeAreaViewWithBackground dismissKeyboardOnPress>

			<Gap size={8}/>
			<BackButton/>

			<StyledText look="68 semibold veryHard">Set up</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>

			<Gap size={35}/>
			<HorizontalLine/>
			<Gap size={35}/>

			<FormCard>
				<FormHeader>Create company</FormHeader>
				<InputBubble fieldName="companyName" placeholder={"Company name"} submitOnEnter/>
				<ErrorMessages validate={validateCompanyName}/>
				<SubmitButton to="/setup/create-account">Next</SubmitButton>
			</FormCard>

		</SafeAreaViewWithBackground>
	);
	
}
