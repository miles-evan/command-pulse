import IconAndTextButton from "@/components/IconAndTextButton.jsx";


export default function AddShiftButton({ onPress }) {
	
	return <IconAndTextButton iconName="add-circle-outline" text="Add shift" onPress={onPress}/>;
	
}