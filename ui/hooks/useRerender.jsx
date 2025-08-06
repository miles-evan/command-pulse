import { useState } from "react";

export default function useRerender() {
	const [c, setC] = useState(0);
	return () => setC(prev => prev + 1);
}