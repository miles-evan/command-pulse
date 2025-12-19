import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/project-specific-utility-components/BackButton.jsx";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/general-utility-components/Gap.jsx";
import ErrorMessages from "@/components/form-card/ErrorMessages";
import { validateInviteCode } from "@/utils/validation.ts";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import useKeyboardVisible from "@/hooks/useKeyboardVisible.js";
import If from "@/components/general-utility-components/If.jsx";


export default function JoinCompany() {
	
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
				<FormHeader>Join company</FormHeader>
				<InputBubble fieldName="inviteCode" placeholder={"Join code"} keyboardType="number-pad" submitOnEnter/>
				<ErrorMessages validate={validateInviteCode}/>
				<SubmitButton to="/setup/create-account">Next</SubmitButton>
			</FormCard>

		</SafeAreaViewWithBackground>
	);
	
}
