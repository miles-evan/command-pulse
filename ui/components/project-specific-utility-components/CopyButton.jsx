import * as Clipboard from 'expo-clipboard';
import IconAndTextButton from "@/components/project-specific-utility-components/IconAndTextButton.jsx";
import { useState } from "react";


export default function CopyButton({ textToCopy, style }) {
	
	const [isCheckMark, setIsCheckMark] = useState();
	
	return (
		<IconAndTextButton
			size={isCheckMark? 26 : 22}
			iconName={isCheckMark? "check" : "content-copy"}
			onPress={() => {
				Clipboard.setStringAsync(textToCopy);
				setIsCheckMark(true);
				setTimeout(() => setIsCheckMark(false), 1000)
			}}
			style={style}
		/>
	);
}
