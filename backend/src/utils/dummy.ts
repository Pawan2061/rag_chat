import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "./model";
export const createChain = (topic: string) => {
  const prompt = ChatPromptTemplate.fromTemplate(
    `firstly, if im sharing you a api request , please verify it first and  tell me about ${topic} but dont give me the code just give me a refrence and just give me the response of only 100 words only and dont exaggerate just give me the main points in paragraph`
  );

  return prompt.pipe(model).pipe(new StringOutputParser());
};
