import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { useState } from "react";
import { Pressable, View } from "react-native";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import If from "@/components/general-utility-components/If.jsx";


export default function EditButton({
	initiallyEditing=false, onEdit=()=>{}, onDone=()=>{}, withCancelButton=false, onCancel=()=>{}, disabled=false, style={}
}) {
	
	const [editing, setEditing] = useState(initiallyEditing);
	
	
	function toggleEditing() {
		if(disabled) return;
		(editing? onDone : onEdit)();
		setEditing(prev => !prev);
	}
	
	
	function cancel() {
		if(!disabled) {
			setEditing(false);
			onCancel();
		}
	}
	
	
	return (
		<FlexRowSpaceBetween style={style}>
			
			{withCancelButton && editing? (
				<Pressable onPress={cancel}>
					{({ pressed }) => (
						<StyledText look={"18 regular " + (pressed || disabled ? "medium" : "mediumSoft")}>
							Cancel
						</StyledText>
					)}
				</Pressable>
			) : (
				<View/>
			)}
			
			<Pressable onPress={toggleEditing}>
				{({ pressed }) => (
					<StyledText look={"18 regular " + (pressed || disabled ? "softAccent" : "accent")}>
						{editing ? "Done" : "Edit"}
					</StyledText>
				)}
			</Pressable>
			
		</FlexRowSpaceBetween>
	);
	
}