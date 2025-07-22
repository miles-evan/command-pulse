import StyledText from "@/components/general-utility-components/StyledText.jsx";


export default function LoadingText({ invisible=false }) {
	return <StyledText look="18 semibold hard">{
		invisible? "" : "Loading..."
	}</StyledText>;
}