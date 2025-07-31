import { chatGPTPrompt } from "./chatGPT.js";

const incidentReportStructure = JSON.stringify({
	note: "this is a json representation of what should be included. the actual structure will be in raw markdown (no ```markdown and stuff)",
	structure: [
		{ "general information": [
			"officer name",
			"date of incident",
			"location of incident"
		]},
		{ "incident details": [
			"type of incident (like theft, vandalism, trespassing etc.)",
			"description of incident (include what happened, who was involved, and any important observations)"
		]},
		{ "actions taken": [
			{ "notified law enforcement": [
				"agency",
				"case #",
			]},
			"issued verbal warning",
			"escorted individual off property",
			"provided medical assistance",
			"monitored and noted activity",
			"contacted property owner/manager",
			"other",
		]},
		{ "witnesses & evidence": [
			{ "witnesses (if applicable)": [
				"names",
				"contact details",
				"statements if provided",
			]},
			"video surveillance available?",
			"photos taken?",
			"additional evidence collected"
		]},
		{ "incident resolution & follow-up":
			"final actions taken, including arrests, emergency responses, or if further investigation is needed"
		},
		{ "officer certification": [
			"I certify that the information provided in this report is true and accurate to the best of my knowledge.",
			"electronic signature",
			"date of report creation",
		]},
	]
});

export async function promptGenerateIncidentReport(user, company, shift, incidentInfo) {
	const prompt = "You're a security assistant helping write professional incident reports in markdown. "
		+ "Based on the metadata and officer's description, generate a clear, complete report using this structure:\n"
		+ incidentReportStructure
		+ "\nInfo:\n"
		+ JSON.stringify({
			metadata: { user, company, shift },
			incidentInfo
		});
	return await chatGPTPrompt(prompt);
}