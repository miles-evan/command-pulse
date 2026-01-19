import SafeAreaViewWithBackground from "@/components/project-specific-utility-components/SafeAreaViewWithBackground.jsx";
import Button from "@/components/project-specific-utility-components/Button.jsx";
import StyledText from "@/components/general-utility-components/StyledText.jsx";
import FormHeader from "@/components/form-card/FormHeader";
import FormCard from "@/components/form-card/FormCard";
import Gap from "@/components/general-utility-components/Gap.jsx";
import HorizontalLine from "@/components/general-utility-components/HorizontalLine.jsx";
import OrLine from "@/components/general-utility-components/OrLine.jsx";
import { ScrollView, View } from "react-native";


export default function GetStarted() {
	
	
	return (
		<SafeAreaViewWithBackground>
			
			<View style={{ width: "85%", marginHorizontal: "auto" }}>
				<StyledText look="68 semibold veryHard" numberOfLines={1} adjustsFontSizeToFit>Welcome</StyledText>
				<StyledText look="44 medium veryHard" numberOfLines={1} adjustsFontSizeToFit>Command Pulse</StyledText>
			</View>
			
			<Gap size="5%"/>
			
			<FormCard>
				<FormHeader>Get started</FormHeader>
				<Button look="white" to="/setup/join-company">Join a company</Button>
				<Button to="/setup/create-company" withParams={{ isCreatingCompany: true }}>Create a new company</Button>
			</FormCard>
			
			<OrLine style={{ marginVertical: "5%" }}/>
			
			<StyledText look="25 semibold mediumHard">Already in a company?</StyledText>
			<Button look="lightBlue" to="/setup/login" withParams={{ alreadyInCompany: true }} style={{ width: "72%" }}>Log in</Button>
			
		</SafeAreaViewWithBackground>
	);
	
}
