import React, {useContext, useEffect, useState} from "react";
import { GlobalStateContext } from "@/utils/GlobalStateContext";
import StyledText from "@/components/StyledText";
import * as companyService from "@/services/companyService";
import { router } from "expo-router";


export default function TabHeader() {
	
	const { companyName } = useContext(GlobalStateContext);
	
	
	return (
		<StyledText look="40 medium veryHard" adjustsFontSizeToFit>{companyName}</StyledText>
	);
	
}