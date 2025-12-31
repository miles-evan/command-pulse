import Animated, { FadeInDown, FadeOut, LinearTransition } from "react-native-reanimated";


export default function LinearAnimatedViewSpringyAnimatedView({ damping=15, stiffness=100, children, ...rest }) {
	
	return (
		<Animated.View
			layout={LinearTransition.springify().damping(damping).stiffness(stiffness)}
			entering={FadeInDown}
			exiting={FadeOut}
			{...rest}
		>
			{children}
		</Animated.View>
	)
	
}