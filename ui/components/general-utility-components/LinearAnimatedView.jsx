import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";


export default function LinearAnimatedView({ children, ...rest }) {
	
	return (
		<Animated.View
			layout={LinearTransition.duration(175)}
			entering={FadeInDown}
			exiting={FadeOut}
			{...rest}
		>
			{children}
		</Animated.View>
	)
	
}