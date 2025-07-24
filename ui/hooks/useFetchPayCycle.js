import { useEffect, useMemo, useState } from "react";
import * as payCycleService from "@/services/payCycleService.js";
import { getPayCycleRange } from "@/utils/dateUtils.js";


export default function useFetchPayCycleSummary(userId=null) {
	
	const [dateRangeIndex, setDateRangeIndex] = useState(0);
	const [dateRange, payDay] = useMemo(() => getPayCycleRange(dateRangeIndex), [dateRangeIndex]);
	const [isLoading, setIsLoading] = useState(true);
	const [payCycleSummaries, setPayCycleSummaries] = useState({});
	
	useEffect(() => {
		fetchPayCycleSummary();
	}, [dateRangeIndex, userId]);
	
	useEffect(() => {
		setPayCycleSummaries({});
		setDateRangeIndex(0);
	}, [userId]);
	
	async function fetchPayCycleSummary() {
		setIsLoading(true);
		if(!(dateRangeIndex in payCycleSummaries)) {
			const payCycleSummary = (await payCycleService.getSummary(userId, ...dateRange)).body;
			setPayCycleSummaries(prev => ({ ...prev, [String(dateRangeIndex)]: payCycleSummary }));
		}
		setIsLoading(false);
	}
	
	function previousPayCycleSummary() {
		setIsLoading(true);
		setDateRangeIndex(prev => prev - 1);
	}
	
	function nextPayCycleSummary() {
		setIsLoading(true);
		setDateRangeIndex(prev => prev + 1);
	}
	
	return {
		dateRange,
		payDay,
		previousPayCycleSummary,
		nextPayCycleSummary,
		payCycleSummary: payCycleSummaries[String(dateRangeIndex)] ?? {},
		isLoading
	}
	
}