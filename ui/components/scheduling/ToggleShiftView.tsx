
// lets you switch between seeing company schedule and your own schedule
import { router } from "expo-router";
import ToggleText from "@/components/general-utility-components/ToggleText";

export default function ToggleShiftView({ startState }: { startState: "company" | "me" }) {
	return (
		<ToggleText
			startState={startState === "company"? 0 : 1}
			state0Text="See my schedule"
			onState1={() => router.replace("/(tabs)/schedule/my-schedule")}
			state1Text="See company schedule"
			onState0={() => router.replace("/(tabs)/schedule/company-schedule")}
		/>
	)
}