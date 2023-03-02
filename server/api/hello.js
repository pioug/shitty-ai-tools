import * as dotenv from "dotenv";
import { appendHeader } from "h3";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export default defineEventHandler(async function (event) {
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a fun coding project" },
      { role: "user", content: "Can you say hello in 3 different languages?" },
    ],
  });
  appendHeader(event, "Cache-Control", `public, max-age=3600, s-maxage=3600`);
  return result.data;
});
