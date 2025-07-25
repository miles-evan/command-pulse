import StyledText from "@/components/general-utility-components/StyledText.jsx";


export default function LoadingText({ invisible=false, ...rest }) {
	return <StyledText look="18 semibold hard" {...rest}>
		{invisible? "" : "Loading..."}
	</StyledText>;
}