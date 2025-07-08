import SafeAreaViewWithBackground from "@/components/SafeAreaViewWithBackground";
import StyledText from "@/components/StyledText";
import FormCard from "@/components/form-card/FormCard";
import FormHeader from "@/components/form-card/FormHeader";
import BackButton from "@/components/BackButton";
import InputBubble from "@/components/form-card/InputBubble";
import SubmitButton from "@/components/form-card/SubmitButton";
import Gap from "@/components/Gap";
import { useLocalSearchParams } from "expo-router";


export default function PersonalInfo() {
	
	const params = useLocalSearchParams();
	console.log(params);
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<Gap size={10}/>
			
			<BackButton/>
			
			<StyledText look="68 semibold veryHard">Set up</StyledText>
			<StyledText look="44 medium veryHard">Command Pulse</StyledText>
			
			<Gap size={25}/>
			
			<FormCard>
				<FormHeader>Personal info</FormHeader>
				<InputBubble fieldName="firstName" placeholder="first name"/>
				<InputBubble fieldName="lastName" placeholder="last name"/>
				<InputBubble fieldName="phoneNumber" placeholder="phone number"/>
				<SubmitButton>Finish</SubmitButton>
			</FormCard>
		
		</SafeAreaViewWithBackground>
	);
	
}
