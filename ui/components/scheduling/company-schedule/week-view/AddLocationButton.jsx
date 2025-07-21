import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";


export default function AddLocationButton({ onPress, ...rest }) {
	
	return <IconAndTextButton
		iconName="add-circle-outline"
		text="Add location"
		onPress={onPress}
		{...rest}
	/>;
	
}