import StyledText from "@/components/general-utility-components/StyledText.jsx";
import StyledTextInput from "@/components/project-specific-utility-components/StyledTextInput.jsx";
import StyledDropdown from "@/components/project-specific-utility-components/StyledDropdown.jsx";
import { View } from "react-native";
import Gap from "@/components/general-utility-components/Gap.jsx";
import { useEffect } from "react";


export default function Questions({ questions, answerRefsRef }) {
	
	useEffect(() => {
		Object.defineProperty(answerRefsRef.current, "questions", {
			get() {
				const cleanedQuestions = {};
				for(const question in this._questions)
					cleanedQuestions[question] = this._questions[question].current;
				return cleanedQuestions;
			}
		});
	}, [answerRefsRef]);
	
	
	return questions.map(question => {
		if(!("_questions" in answerRefsRef.current))
			answerRefsRef.current._questions = {};
		if(!(question.question in answerRefsRef.current._questions))
			answerRefsRef.current._questions[question.question] = { current: null };
		const answerRef = answerRefsRef.current._questions[question.question];
		return (
			<View key={question.question}>
				<StyledText look="20 medium mediumHard" hCenter={false}>{question.question}</StyledText>
				{question.type === "select"? (
					<StyledDropdown
						data={ question.options.map(option => ({ label: option, value: option })) }
						onChange={ item => answerRef.current = item.value }
						style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
					/>
				) : (
					<StyledTextInput
						placeholder={ question.placeholder }
						valueRef={ answerRef }
						bigTextMode
						bigMode={ question.type === "textarea" }
						style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
					/>
				)}
				<Gap size={30}/>
			</View>
		)
	});
	
}