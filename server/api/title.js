import * as dotenv from "dotenv";
import { appendHeader } from "h3";
import parser from "accept-language-parser";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export default defineEventHandler(async function (event) {
  const headers = getHeaders(event);
  const [language] = parser.parse(headers["accept-language"]);
  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a fun coding project" },
      {
        role: "user",
        content: `Give a title for an experimental web page using OpenAI API. No placeholder, no annotation, use 80 chars max, use this language ${language.code}`,
      },
    ],
  });
  appendHeader(event, "Cache-Control", `public, max-age=3600, s-maxage=3600`);
  return result.data;
});
