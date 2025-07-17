import StyledText from "@/components/general-utility-components/StyledText.jsx";
import { useState } from "react";
import {Pressable, View} from "react-native";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";
import If from "@/components/general-utility-components/If.jsx";


export default function EditButton({ onEdit=()=>{}, onDone=()=>{}, withCancelButton=false, onCancel=()=>{} }) {
	
	const [editing, setEditing] = useState(false);
	
	
	function toggleEditing() {
		(editing? onDone : onEdit)();
		setEditing(prev => !prev);
	}
	
	
	function cancel() {
		setEditing(false);
		onCancel();
	}
	
	
	return (
		<FlexRowSpaceBetween>
			
			<If condition={withCancelButton && editing}>
				<Pressable onPress={cancel}>
					{({ pressed }) => (
						<StyledText look={"18 regular " + (pressed ? "medium" : "mediumSoft")}>
							Cancel
						</StyledText>
					)}
				</Pressable>
			</If>
			<If condition={!(withCancelButton && editing)}>
				<View/>
			</If>
			
			<Pressable onPress={toggleEditing}>
				{({ pressed }) => (
					<StyledText look={"18 regular " + (pressed ? "softAccent" : "accent")}>
						{editing ? "Done" : "Edit"}
					</StyledText>
				)}
			</Pressable>
			
		</FlexRowSpaceBetween>
	);
	
}