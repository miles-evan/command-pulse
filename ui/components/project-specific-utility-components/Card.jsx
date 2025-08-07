import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native";
import {Colors} from "@/constants/Colors.js";
import Gap from "@/components/general-utility-components/Gap.jsx";
import RemoveButton from "@/components/project-specific-utility-components/RemoveButton.jsx";
import If from "@/components/general-utility-components/If.jsx";


export default function Card({
	children,
	style,
	onPress=()=>{},
	onLongPress=()=>{},
	showPressFeedback=false,
	showRemoveButton=false,
	onDelete=()=>{},
	removeButtonPositionLeft=8,
	removeButtonPositionTop=15,
}) {
	
	return (
		<Pressable onPress={onPress} onLongPress={onLongPress}>
			{({ pressed }) => (
				<View>
					<If condition={showRemoveButton}>
						<Gap size={10}/>
						<RemoveButton onPress={onDelete} style={{
							position: "absolute", left: removeButtonPositionLeft, top: removeButtonPositionTop, zIndex: 1
						}}/>
					</If>
					
					<View style={{
						width: "90%",
						marginHorizontal: "auto",
						marginVertical: 16,
						
						paddingHorizontal: 16,
						paddingVertical: 24,
						
						backgroundColor: "rgba(255, 255, 255, 0.75)",
						
						borderRadius: 16,
						borderWidth: 1,
						borderColor: pressed && showPressFeedback? Colors.medium : Colors.soft,
						
						...style,
					}}>
						{children}
					</View>
				</View>
			)}
		</Pressable>
	);
	
}
