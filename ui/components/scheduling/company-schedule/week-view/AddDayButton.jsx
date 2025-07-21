import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";


export default function AddDayButton({ onPress, ...rest }) {
	
	return <IconAndTextButton
		iconName="add-circle-outline"
		size={28}
		onPress={onPress}
		outerContainerStyle={{ flex: 1, justifyContent: "center", marginRight: 10 }}
		{...rest}
	/>;
	
}