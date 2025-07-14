import { useContext } from "react";
import { GlobalStateContext } from "@/utils/GlobalStateContext.js";


export function useGlobalState() {
	return useContext(GlobalStateContext);
}
