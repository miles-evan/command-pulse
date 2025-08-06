import StyledText from "@/components/general-utility-components/StyledText.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import StyledDropdown from "@/components/project-specific-utility-components/StyledDropdown.jsx";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";


export default function Questions({ questions, answerRefsRef }) {
	
	return questions.map(question => {
		const answerRef = answerRefsRef.current[question.question] = { current: null };
		return (
			<View key={question.question}>
				<StyledText look="20 medium veryHard">{question.question}</StyledText>
				{question.type === "select"? (
					<StyledDropdown
						data={ question.options.map(option => ({ label: option, value: option })) }
						onChange={ value => answerRef.current = value }
					/>
				) : (
					<StyledTextInput
						placeholder={ question.placeholder }
						valueRef={ answerRef }
						bigMode={ question.type === "textarea" }
					/>
				)}
				<Gap size={20}/>
			</View>
		)
	});
	
}