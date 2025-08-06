import { useRef } from "react";

export default function useConst(initialValue) {
	return useRef(initialValue).current;
}