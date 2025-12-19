import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// --------------------------------
export async function chatGPTPrompt(prompt) {
    const response = await client.responses.create({
        model: "gpt-4.1",
        input: prompt,
    });
    try {
        return JSON.parse(response.output_text);
    }
    catch {
        return response.output_text;
    }
}
