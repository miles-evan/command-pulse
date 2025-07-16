import { View } from "react-native";


// vertical spacer
export default function Gap({ size, horizontal=false }) {
	return <View style={{ [horizontal? "width" : "height"]: size }} />;
}
