import { useGlobalState } from "@/hooks/useGlobalState.js";
import * as companyService from "@/services/companyService.js";
import { useEffect, useState } from "react";


export default function useInviteCodes() {
	
	const globalState = useGlobalState();
	const [inviteCodes, setInviteCodes] = useState(globalState.inviteCodes ?? { officer: "", supervisor: "" });
	const [loading, setLoading] = useState(true);
	const [loadingReset, setLoadingReset] = useState(false);
	
	
	async function reset() {
		setLoadingReset(true);
		await companyService.resetInviteCodes();
		delete globalState.inviteCodes;
		setLoadingReset(false);
	}
	
	
	useEffect(() => {
		if("inviteCodes" in globalState) {
			setInviteCodes(globalState.inviteCodes);
			setLoading(false);
			return;
		}
		
		companyService.getInviteCodes()
			.then(({ body }) => {
				const newInviteCodes = {
					officer: body.officerInviteCode,
					supervisor: body.supervisorInviteCode
				}
				globalState.inviteCodes = newInviteCodes;
				setInviteCodes(newInviteCodes)
				setLoading(false);
			});
	}, [loadingReset]);
	
	
	return { inviteCodes, loading, reset, loadingReset };
	
}