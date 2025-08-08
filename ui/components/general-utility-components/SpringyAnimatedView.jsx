import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";


export default function SpringyAnimatedView({ children, ...rest }) {
	
	return (
		<Animated.View
			layout={LinearTransition.springify().damping(15).stiffness(100)}
			entering={FadeInDown}
			exiting={FadeOut}
			{...rest}
		>
			{children}
		</Animated.View>
	)
	
}