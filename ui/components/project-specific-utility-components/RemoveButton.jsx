import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";


export default function RemoveButton({ onPress, ...rest }) {
	
	return <IconAndTextButton
		iconName="remove-circle-outline"
		size={28}
		onPress={onPress}
		color="danger"
		pressColor="softDanger"
		innerContainerStyle={{ backgroundColor: "white" }}
		{...rest}
	/>;
	
}