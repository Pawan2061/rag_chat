import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { combineDocs } from "./combine";
import { model } from "./model";
import { retriever } from "./retriever";

const openAIApiKey: string = process.env.OPENAI_API_KEY || "";

const standaloneQuestionTemplate = `Given  question, convert the question to a standalone question. 

question: {question} 
standalone question:`;
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate
);

const answerTemplate: string = ` Try to find the answer in the question and evaluate the context properly and answer  . If you really don't know the answer, say "I'm sorry, I don't know the answer to the question , I'm here to provide information and answer questions related to the ". Don't try to make up an answer. Always speak as if you were chatting to a friend and remeber to answer question like hello politely and other questions like how are you.




question: {question}
answer: `;
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const standaloneQuestionChain = standaloneQuestionPrompt
  .pipe(model)
  .pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
  (prevResult) => prevResult.standalone_question,
  retriever,
  combineDocs,
]);

const answerChain = answerPrompt.pipe(model).pipe(new StringOutputParser());

const chain = RunnableSequence.from([
  {
    standalone_question: standaloneQuestionChain,
    original_input: new RunnablePassthrough(),
  },
  {
    context: retrieverChain,

    question: ({ original_input }) => {
      return original_input.question;
    },
  },
  answerChain,
]);

export { chain };
