import StyledText from "@/components/general-utility-components/StyledText.jsx";
import FlexRowSpaceBetween from "@/components/general-utility-components/FlexRowSpaceBetween.jsx";


export default function LocationAndPayRate({ location, payRate }) {
	
	return (
		<FlexRowSpaceBetween>
			
			<StyledText look="24 light veryHard" hCenter={false} style={{ flexShrink: 1 }}>
				{location}
			</StyledText>
			
			<StyledText look="24 light veryHard" hCenter={false} style={{ flexShrink: 1 }} adjustsFontSizeToFit numberOfLines={1}>
				{`$${payRate}/hr`}
			</StyledText>
			
		</FlexRowSpaceBetween>
	);
	
}