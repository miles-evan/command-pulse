import { chatGPTPrompt } from "./chatGPT.js";
import { getTodayString } from "../utils/dateUtils.js";

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

const followUpQuestions = JSON.stringify({
	note: "the follow up questions should be in JSON format as so",
	exampleStructure: [
		{
			question: "What time did the incident occur?",
			type: "text",
		},
		{
			question: "Can you describe what led up to the incident?",
			type: "text",
		},
		{
			question: "Did you issue a verbal warning?",
			type: "select",
			options: ["Yes", "No"],
		}
	]
});

export async function promptGenerateIncidentReport(user, company, shift, dateCreated, incidentInfo) {
	const prompt =
		"You're a security assistant helping write professional incident reports in markdown. "
		+ "Based on the metadata and officer's description, generate a clear, complete report using this structure:\n"
		+ incidentReportStructure
		+ "\nRespond in JSON with keys, 'report' and 'followUpQuestions'\n"
		+ "Provide followUpQuestions if there is unspecified information or you want clarification\n"
		+ "If while writing the report you realize there's missing info, stop and add the followUpQuestions key\n"
		+ "If no follow up questions, don't include the followUpQuestions key at all.\n"
		+ "Hint: if while writing the report you write 'unspecified' please give follow up questions!!!\n"
		+ "But don't include unnecessary questions!!!\n"
		+ "followUpQuestions should be in the form:\n"
		+ followUpQuestions
		+ "Info:\n"
		+ JSON.stringify({
			metadata: {
				user,
				company,
				shift,
				dateCreated,
			},
			incidentInfoWrittenByUser: incidentInfo,
		});
	return await chatGPTPrompt(prompt);
}


export async function promptReviseIncidentReport(currentReport, revisions) {
	const prompt =
		"You're a security assistant helping write professional incident reports in markdown."
		+ " Based on the previous iteration of the report and officer's revisions / answers to your questions,"
		+ " generate a clear, complete report using this structure:\n"
		+ incidentReportStructure
		+ "\nRespond in JSON with the key, 'report'\n"
		+ "Info:\n"
		+ JSON.stringify({
			previousIterationOfTheReport: currentReport,
			revisionsWrittenByUser: revisions,
		});
	return await chatGPTPrompt(prompt);
}