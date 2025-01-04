import { ChatOpenAI } from "@langchain/openai";
export const model = new ChatOpenAI({
  model: "gpt-4",
  apiKey: process.env.OPENAI_API_KEY,
});
