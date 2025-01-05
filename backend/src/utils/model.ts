import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
// export const chatModel = new ChatAnthropic({
//   apiKey: process.env.OPENAI_API_KEY,
//   model: "claude-3-5-sonnet-20240620",
// });
// export const model = new ChatOpenAI({
//   model: "gpt-4",
//   apiKey: process.env.OPENAI_API_KEY,
// });

export const model = new ChatOpenAI({
  model: "gpt-4",
  apiKey:
    "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",
});
