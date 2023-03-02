import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const openai = new OpenAIApi(
	new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	})
);

const result = await openai.createChatCompletion({
	model: "gpt-3.5-turbo",
	messages: [
		{ role: "system", content: "You are a fun coding project" },
		{ role: "user", content: "Can you say hello in 3 different languages?" },
	],
});

console.log(result.data.choices);
