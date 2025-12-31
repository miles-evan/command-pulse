import { useEffect, useMemo, useState } from "react";
import * as payCycleService from "@/services/payCycleService.ts";
import { getPayCycleRange } from "@/utils/dateUtils.js";


export default function useFetchPayCycleSummary(userId=null, currentPayCycle=null) {
	
	const [dateRangeIndex, setDateRangeIndex] = useState(0);
	const { dateRange, payDay } = useMemo(() => getPayCycleRange(dateRangeIndex), [dateRangeIndex]);
	const [loading, setLoading] = useState(true);
	const [payCycleSummaries, setPayCycleSummaries] = useState({});
	
	useEffect(() => {
		fetchPayCycleSummary();
	}, [dateRangeIndex, userId]);
	
	useEffect(() => {
		setPayCycleSummaries(currentPayCycle? { 0: currentPayCycle } : {});
		setDateRangeIndex(0);
	}, [userId]);
	
	async function fetchPayCycleSummary(refetch=false) {
		if(!(dateRangeIndex in payCycleSummaries) || refetch) {
			setLoading(true);
			const payCycleSummary = (await payCycleService.getSummary(userId, ...dateRange)).body;
			setPayCycleSummaries(prev => ({ ...prev, [String(dateRangeIndex)]: payCycleSummary }));
		}
		setLoading(false);
	}
	
	function previousPayCycleSummary() {
		if(!(dateRangeIndex - 1 in payCycleSummaries))
			setLoading(true);
		setDateRangeIndex(prev => prev - 1);
	}
	
	function nextPayCycleSummary() {
		if(!(dateRangeIndex + 1 in payCycleSummaries))
			setLoading(true);
		setDateRangeIndex(prev => prev + 1);
	}
	
	return {
		dateRange,
		payDay,
		previousPayCycleSummary,
		nextPayCycleSummary,
		updatePayCycle: () => fetchPayCycleSummary(true),
		payCycleSummary: payCycleSummaries[String(dateRangeIndex)] ?? {},
		loading,
	}
	
}